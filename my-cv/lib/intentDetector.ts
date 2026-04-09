// ============================================================
// intentDetector.ts — Tầng ②: Phát hiện intent
// ============================================================

export type Intent =
  | "project_inquiry"   // hỏi về dự án cụ thể
  | "skill_inquiry"     // hỏi về kỹ năng / tech stack
  | "contact_inquiry"   // hỏi cách liên hệ
  | "hiring_inquiry"    // tuyển dụng, freelance
  | "web_search_needed" // hỏi kiến thức bên ngoài (tech mới,...)
  | "general";          // trò chuyện chung

const PATTERNS: { intent: Intent; keywords: string[] }[] = [
  {
    intent: "project_inquiry",
    keywords: [
      "dự án", "project", "demo", "github", "source code",
      "build gì", "làm gì", "tính năng", "feature",
      "todo", "flashcard", "tera", "blog", "comparison",
    ],
  },
  {
    intent: "skill_inquiry",
    keywords: [
      "kỹ năng", "skill", "tech stack", "công nghệ", "học gì",
      "react", "next", "node", "typescript", "tailwind",
      "database", "firebase", "postgresql", "redis", "docker",
    ],
  },
  {
    intent: "contact_inquiry",
    keywords: [
      "liên hệ", "contact", "email", "facebook", "zalo",
      "nhắn tin", "message", "reach out",
    ],
  },
  {
    intent: "hiring_inquiry",
    keywords: [
      "thuê", "hire", "tuyển", "freelance", "job",
      "lương", "salary", "available", "remote", "full-time", "part-time",
    ],
  },
  {
    intent: "web_search_needed",
    keywords: [
      "mới nhất", "latest", "2024", "2025", "hiện tại", "current",
      "update", "release", "tin tức", "news",
    ],
  },
];

export function detectIntent(text: string): Intent {
  const lower = text.toLowerCase();
  let best: Intent = "general";
  let bestScore = 0;

  for (const { intent, keywords } of PATTERNS) {
    const score = keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best;
}