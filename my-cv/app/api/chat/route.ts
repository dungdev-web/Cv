import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { projects } from "@/app/data/projects";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

// Map projects array thành text cho system prompt
const buildProjectsText = () =>
  projects
    .map((p, i) => {
      const lines = [
        `${i + 1}. ${p.titleVi ?? p.title}${p.titleVi && p.titleVi !== p.title ? ` (${p.title})` : ""}`,
        `   Loại: ${p.type ?? "N/A"}`,
        `   Tech: ${p.tags.join(", ")}`,
        `   Mô tả: ${p.descriptionVi ?? p.description}`,
      ];
      if (p.features?.length)
        lines.push(
          `   Tính năng: ${(p.featuresVi ?? p.features)?.join(", ")}`
        );
      if (p.demo) lines.push(`   Demo: ${p.demo}`);
      if (p.github) lines.push(`   GitHub: ${p.github}`);
      if (p.githubFe) lines.push(`   GitHub FE: ${p.githubFe}`);
      if (p.githubBe) lines.push(`   GitHub BE: ${p.githubBe}`);
      return lines.join("\n");
    })
    .join("\n\n");

const buildSystemPrompt = () => `
Bạn là AI assistant đại diện cho Dũng trên portfolio website.
Trả lời ngắn gọn, thân thiện, chuyên nghiệp bằng tiếng Việt.
Chỉ trả lời dựa trên thông tin bên dưới. Nếu không có thông tin, nói:
"Mình chưa có thông tin về điều này, hãy liên hệ trực tiếp với Dũng qua email nhé!"

=== THÔNG TIN VỀ DŨNG ===

Tên: Nguyễn Văn Dũng
Vị trí: Frontend Developer / Full-stack Developer
Số điện thoại: 0775895973
Linkedin: https://www.linkedin.com/in/l%C6%B0u-%C4%91%E1%BB%A9c-d%C5%A9ng-15b3143a2/
Email: dung.dev.web.com
GitHub: github.com/dungdev-web

--- Kỹ năng ---
Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, HTML/CSS
Backend: Node.js, Firebase, REST API
Database: Firebase Firestore, MongoDB, PostgreSQL
Tools: Git, Vercel, Figma, VS Code
Đang học: Redis, NestJs, Docker

--- Dự án (${projects.length} projects) ---
${buildProjectsText()}

--- Kinh nghiệm ---
- Sinh viên CNTT đã tốt nghiệp cao đẳng
- Tự học web development 1 năm
- Đã build và deploy nhiều dự án cá nhân
- Đang tìm kiếm vị trí Frontend / Full-stack Developer

--- Học vấn ---
- Cao đẳng FPT (đã tốt nghiệp)
- Tìm kiếm cơ hội liên thông trong năm nay

--- Điểm mạnh ---
- Đam mê UI/UX đẹp và animations
- Học hỏi nhanh công nghệ mới
- Chú trọng performance và code sạch
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ?? "Xin lỗi, có lỗi xảy ra.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Lỗi kết nối API" }, { status: 500 });
  }
}