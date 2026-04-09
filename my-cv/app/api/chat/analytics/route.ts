// ============================================================
// app/api/chat/analytics/route.ts
// GET /api/chat/analytics — đọc data từ Redis
// ============================================================

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    // Top projects với score
    const projectRaw = await redis.zrange("project_mentions", 0, -1, {
      rev: true,
      withScores: true,
    });

    const topProjects: { id: string; score: number }[] = [];
    for (let i = 0; i < projectRaw.length; i += 2) {
      topProjects.push({
        id: String(projectRaw[i]),
        score: Number(projectRaw[i + 1]),
      });
    }

    // Intent breakdown
    const intentRaw = await redis.zrange("intent_counts", 0, -1, {
      rev: true,
      withScores: true,
    });

    const intentBreakdown: Record<string, number> = {};
    for (let i = 0; i < intentRaw.length; i += 2) {
      intentBreakdown[String(intentRaw[i])] = Number(intentRaw[i + 1]);
    }

    return NextResponse.json({
      topProjects,
      totalMentions: topProjects.reduce((s, p) => s + p.score, 0),
      intentBreakdown,
      totalIntents: Object.values(intentBreakdown).reduce((s, v) => s + v, 0),
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: "Lỗi đọc analytics" }, { status: 500 });
  }
}