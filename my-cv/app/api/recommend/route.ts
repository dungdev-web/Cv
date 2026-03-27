import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { projects } from "@/app/data/projects";
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});
export async function POST(req: NextRequest) {
  try {
    const { jd } = await req.json();

    if (!jd || typeof jd !== "string") {
      return NextResponse.json({ error: "Missing JD" }, { status: 400 });
    }

    const projectsText = projects.map(
      (p) => `- ${p.title} | Stack: ${p.techStack.join(", ")} |Tag: ${p.tags.join(", ")} | Mô tả: ${p.fullDescription}`
    ).join("\n");

    const prompt = `Recruiter yêu cầu: "${jd}"

Danh sách projects của Dũng:
${projectsText}

Hãy phân tích và trả về JSON (không markdown, không giải thích thêm):
{
  "matches": [
    {
      "id": "portfolio",
      "name": "tên project",
      "score": 85,
      "reason": "lý do ngắn gọn tại sao phù hợp (1-2 câu)",
      "pitch": "1 câu pitch cho recruiter",
      "matchedSkills": ["skill1", "skill2"]
    }
  ]
}

Sắp xếp theo score giảm dần. Score từ 0-100 dựa trên độ phù hợp với JD.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.3,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    } catch {
      parsed = { matches: [] };
    }

    // Gắn link từ PROJECTS gốc vào kết quả
    const enriched = (parsed.matches ?? []).map((m: { id: string; [key: string]: unknown }) => {
      const original = projects.find((p) => p.id === m.id);
      return { ...m, link: original?.demo, github: original?.github };
    });

    return NextResponse.json({ matches: enriched });
  } catch (error) {
    console.error("Recommender error:", error);
    return NextResponse.json({ error: "Lỗi API" }, { status: 500 });
  }
}