import { NextRequest, NextResponse } from "next/server";
import { notifyVisitor } from "@/lib/telegram";

const recentVisitors = new Map<string, number>();
const COOLDOWN_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";
    const lastSeen = recentVisitors.get(ip);
    if (lastSeen && Date.now() - lastSeen < COOLDOWN_MS) {
      return NextResponse.json({ ok: true, skipped: true });
    }
    recentVisitors.set(ip, Date.now());

    const country = req.headers.get("x-vercel-ip-country") ?? undefined;
    const city = req.headers.get("x-vercel-ip-city")
      ? decodeURIComponent(req.headers.get("x-vercel-ip-city")!)
      : undefined;
    const ua = req.headers.get("user-agent") ?? undefined;

    notifyVisitor({ page, country, city, ua });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}