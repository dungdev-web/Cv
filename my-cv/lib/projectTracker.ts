import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const DECAY_WINDOW_MS = 60 * 60 * 1000;

// ── Constants (giữ nguyên từ bản cũ) ──────────────────────
const PROJECT_KEYWORDS: Record<string, string[]> = {
  "todo":       ["todo app", "todo", "quản lý công việc", "task"],
  "flashcard":  ["flashcard", "thẻ ghi nhớ", "học từ vựng", "deck"],
  "tera-shoes": ["tera shoes", "tera", "giày", "e-commerce", "ecommerce", "bán giày"],
  "comparison": ["company comparison", "so sánh công ty", "comparison app"],
  "blog":       ["blog", "personal blog", "cohere", "bài viết"],
};

const PROJECT_LABELS: Record<string, string> = {
  "todo":       "Todo App",
  "flashcard":  "Flashcard App",
  "tera-shoes": "Tera Shoes (e-commerce)",
  "comparison": "Company Comparison App",
  "blog":       "Personal Blog (AI-powered)",
};

const RELATED_PROJECTS: Record<string, string[]> = {
  "todo":       ["flashcard", "tera-shoes"],
  "flashcard":  ["todo", "blog"],
  "tera-shoes": ["comparison", "todo"],
  "comparison": ["tera-shoes", "blog"],
  "blog":       ["flashcard", "comparison"],
};

// ── Track ──────────────────────────────────────────────────
export async function trackProjectMention(projectId: string) {
  await redis.zincrby("project_mentions", 1, projectId);
  await redis.set(`project:${projectId}:lastSeen`, Date.now());
}

// ── Score ──────────────────────────────────────────────────
export async function getProjectScore(projectId: string): Promise<number> {
  const score = await redis.zscore("project_mentions", projectId);
  if (!score) return 0;

  const lastSeen = await redis.get<number>(`project:${projectId}:lastSeen`);
  if (!lastSeen) return score;

  const ageMs = Date.now() - lastSeen;
  return ageMs > DECAY_WINDOW_MS ? score * 0.5 : score;
}

// ── Top projects ───────────────────────────────────────────
export async function getTopProjects(limit = 3): Promise<string[]> {
  const results = await redis.zrange("project_mentions", 0, limit - 1, { rev: true });
  return results as string[];
}

// ── Snapshot ───────────────────────────────────────────────
export async function getAnalyticsSnapshot(): Promise<Record<string, number>> {
  const results = await redis.zrange("project_mentions", 0, -1, {
    rev: true,
    withScores: true,
  });

  const out: Record<string, number> = {};
  for (let i = 0; i < results.length; i += 2) {
    out[results[i] as string] = Math.round((results[i + 1] as number) * 10) / 10;
  }
  return out;
}

// ── Detect ─────────────────────────────────────────────────
export function detectProjectsInText(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];

  for (const [projectId, keywords] of Object.entries(PROJECT_KEYWORDS)) {
    if ((keywords as string[]).some((kw: string) => lower.includes(kw))) {
      found.push(projectId);
    }
  }
  return found;
}

// ── Recommendation (giờ là async) ─────────────────────────
export async function buildRecommendationContext(
  currentProjects: string[]
): Promise<string> {
  const candidates = new Set<string>();

  for (const pid of currentProjects) {
    (RELATED_PROJECTS[pid] ?? []).forEach((r) => candidates.add(r));
  }

  const top = await getTopProjects(3);
  top.forEach((p) => candidates.add(p));
  currentProjects.forEach((p) => candidates.delete(p));

  const suggestions = [...candidates].slice(0, 2);
  if (suggestions.length === 0) return "";

  const labels = suggestions.map((id) => PROJECT_LABELS[id] ?? id).join(", ");
  return `\n[Gợi ý tự nhiên nếu phù hợp: ${labels}]`;
}