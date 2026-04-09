// ============================================================
// app/api/chat/route.ts — v3
//
// Upgrade so với v2:
//   ✅ Fix: trackProjectMention gọi 2 lần → chỉ 1 lần
//   ✅ Fix: web_search_needed thực sự gọi Tavily
//   ✅ Fix: buildRecommendationContext async đúng cách
//   🆕 Rate limiting via Redis (10 req / 60s / IP)
//   🆕 Streaming response (Server-Sent Events)
//   🆕 Analytics: ghi intent vào Redis để dashboard đọc
// ============================================================

import { NextRequest } from "next/server";
import OpenAI from "openai";
import { Redis } from "@upstash/redis";
import { projects } from "@/app/data/projects";
import { certificates } from "@/app/data/certificate";
import { notifyChat } from "@/lib/telegram";
import {
  detectProjectsInText,
  trackProjectMention,
  buildRecommendationContext,
  getAnalyticsSnapshot,
} from "@/lib/projectTracker";
import { detectIntent, type Intent } from "@/lib/intentDetector";

// ─── Clients ───────────────────────────────────────────────
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ─── ① Sliding window ──────────────────────────────────────
const MAX_MESSAGES = 12;

function trimMessages(messages: any[]): any[] {
  if (messages.length <= MAX_MESSAGES) return messages;
  return messages.slice(-MAX_MESSAGES);
}

// ─── Helpers ───────────────────────────────────────────────
function extractContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((c: any) => c.type === "text")
      .map((c: any) => c.text)
      .join(" ");
  }
  return String(content ?? "");
}

// ─── Data builders ─────────────────────────────────────────
const buildProjectsText = () =>
  projects
    .map((p, i) => {
      const lines = [
        `${i + 1}. ${p.titleVi ?? p.title}`,
        `   Tech: ${p.techStack.join(", ")}`,
        `   Tags: ${p.tags.join(", ")}`,
        `   Mô tả: ${p.fullDescriptionVi ?? p.fullDescription}`,
      ];
      if (p.features?.length)
        lines.push(`   Tính năng: ${(p.featuresVi ?? p.features)?.join(", ")}`);
      if (p.demo) lines.push(`   Demo: ${p.demo}`);
      if (p.github) lines.push(`   GitHub: ${p.github}`);
      return lines.join("\n");
    })
    .join("\n\n");

const buildCertificatesText = () =>
  certificates
    .map((c, i) => `${i + 1}. ${c.title} — ${c.issuer ?? "N/A"} (${c.date})`)
    .join("\n");

function buildSkillsText(): string {
  return `Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
Backend: Node.js, Firebase, REST API, NestJS (đang học)
Database: Firestore, MongoDB, PostgreSQL, Redis (đang học)
Tools: Git, Vercel, Docker (đang học), Figma

Chứng chỉ:
${buildCertificatesText()}`;
}

function getContactText(): string {
  return process.env.AI_KNOWLEDGE_BASE ?? "Liên hệ qua portfolio website.";
}

// ─── 🆕 Rate limiter (Redis sliding window) ────────────────
// 10 request / 60 giây / IP
const RATE_LIMIT = 10;
const RATE_WINDOW_SEC = 60;

async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; remaining: number; retryAfter: number }> {
  const key = `rl:chat:${ip}`;
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_SEC * 1000;

  const pipe = redis.pipeline();
  pipe.zremrangebyscore(key, 0, windowStart); // xoá request hết hạn
  pipe.zadd(key, { score: now, member: String(now) }); // thêm request mới
  pipe.zcard(key); // đếm trong window
  pipe.expire(key, RATE_WINDOW_SEC); // auto-cleanup
  const results = await pipe.exec();

  const count = results[2] as number;
  const allowed = count <= RATE_LIMIT;

  return {
    allowed,
    remaining: Math.max(0, RATE_LIMIT - count),
    retryAfter: allowed ? 0 : RATE_WINDOW_SEC,
  };
}

// ─── ⑤ Web search via Tavily ──────────────────────────────
async function webSearch(query: string): Promise<string> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) return "";

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        query,
        search_depth: "basic",
        max_results: 3,
        include_answer: true,
      }),
    });

    const data = await res.json();
    if (data.answer) return `\n=== KẾT QUẢ TÌM KIẾM ===\n${data.answer}\n`;

    if (data.results?.length) {
      const snippets = (data.results as any[])
        .slice(0, 3)
        .map((r) => `• ${r.title}: ${String(r.content ?? "").slice(0, 200)}`)
        .join("\n");
      return `\n=== KẾT QUẢ TÌM KIẾM ===\n${snippets}\n`;
    }
  } catch (err) {
    console.error("Tavily error:", err);
  }
  return "";
}

// ─── Analytics: ghi intent vào Redis ──────────────────────
async function trackIntent(intent: Intent) {
  await redis.zincrby("intent_counts", 1, intent).catch(() => {});
}

// ─── System prompt ─────────────────────────────────────────
function buildSystemPrompt(
  injectedData: string,
  recommendationContext: string
): string {
  const privateInfo = process.env.AI_KNOWLEDGE_BASE ?? "";
  return `Bạn là AI assistant đại diện cho Dũng trên portfolio website.
Trả lời ngắn gọn, thân thiện, chuyên nghiệp bằng tiếng Việt.
Sử dụng Markdown để định dạng (bold, list, \`code\`).
Chỉ trả lời dựa trên thông tin được cung cấp. Nếu không biết, nói:
"Mình chưa có thông tin, hãy liên hệ trực tiếp với Dũng qua email nhé!"
${privateInfo ? `\n=== THÔNG TIN CƠ BẢN ===\n${privateInfo}` : ""}
Kinh nghiệm: Sinh viên CNTT (Cao đẳng FPT), tự học web 1 năm, thực tập WordPress tại HTDIGI.
Tình trạng: Đang tìm kiếm vị trí Frontend / Full-stack Developer.
${injectedData}${recommendationContext}`;
}

// ─── 🆕 SSE stream builder ─────────────────────────────────
function buildSSEStream(
  groqStream: AsyncIterable<OpenAI.Chat.ChatCompletionChunk>,
  intent: Intent
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const send = (payload: object) =>
    encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);

  return new ReadableStream({
    async start(controller) {
      // Gửi metadata trước để client biết intent
      controller.enqueue(send({ type: "meta", intent }));

      try {
        for await (const chunk of groqStream) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            controller.enqueue(send({ type: "text", content: delta }));
          }
          if (chunk.choices[0]?.finish_reason === "stop") {
            controller.enqueue(send({ type: "done" }));
          }
        }
      } catch {
        controller.enqueue(send({ type: "error", message: "Stream lỗi." }));
      } finally {
        controller.close();
      }
    },
  });
}

// ─── Main handler ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // 🆕 Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const { allowed, remaining, retryAfter } = await checkRateLimit(ip);

    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: `Quá nhiều yêu cầu. Thử lại sau ${retryAfter} giây.`,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await req.json();
    const { messages, stream: wantsStream = true } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ① Sliding window
    const trimmed = trimMessages(messages);
    const userMessages = trimmed.filter((m: any) => m.role === "user");
    const lastUserText = extractContent(
      userMessages[userMessages.length - 1]?.content ?? ""
    );

    // ② Intent detection + analytics
    const intent = detectIntent(lastUserText);
    trackIntent(intent).catch(() => {}); // fire-and-forget

    // ③ Project tracking — 1 lần duy nhất (fix bug)
    const mentionedProjects = detectProjectsInText(lastUserText);
    await Promise.all(mentionedProjects.map(trackProjectMention));

    // Recommendation (async)
    const recommendationContext =
      intent === "project_inquiry"
        ? ""
        : await buildRecommendationContext(mentionedProjects);

    // ④ Inject data theo intent
    let injectedData = "";

    if (intent === "project_inquiry") {
      injectedData = `\n=== DỰ ÁN ===\n${buildProjectsText()}`;
    } else if (intent === "skill_inquiry") {
      injectedData = `\n=== KỸ NĂNG ===\n${buildSkillsText()}`;
    } else if (intent === "contact_inquiry" || intent === "hiring_inquiry") {
      injectedData = `\n=== LIÊN HỆ ===\n${getContactText()}`;
    } else if (intent === "web_search_needed") {
      // ✅ Fix: thực sự gọi Tavily
      injectedData = await webSearch(lastUserText);
    }

    const systemPrompt = buildSystemPrompt(injectedData, recommendationContext);

    // Telegram notify (fire-and-forget, chỉ turn đầu)
    if (userMessages.length === 1) {
      getAnalyticsSnapshot()
        .then((snapshot) =>
          notifyChat({
            question: lastUserText,
            country: req.headers.get("x-vercel-ip-country") ?? undefined,
            ua: req.headers.get("user-agent") ?? undefined,
            intent,
            topProjects: JSON.stringify(snapshot),
          } as any)
        )
        .catch(() => {});
    }

    const llmMessages = [
      { role: "system" as const, content: systemPrompt },
      ...trimmed,
    ];

    // 🆕 Streaming path
    if (wantsStream) {
      const groqStream = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: llmMessages,
        max_tokens: 800,
        temperature: 0.7,
        stream: true,
      });

      return new Response(buildSSEStream(groqStream, intent), {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "X-RateLimit-Remaining": String(remaining),
        },
      });
    }

    // Non-streaming fallback
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: llmMessages,
      max_tokens: 800,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ?? "Xin lỗi, có lỗi xảy ra.";

    return new Response(JSON.stringify({ reply, intent }), {
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Lỗi kết nối API" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}