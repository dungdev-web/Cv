import { NextRequest, NextResponse } from "next/server";
import { notifyContact } from "@/lib/telegram";

// Rate limiting đơn giản
const recentSubmits = new Map<string, number>();
const COOLDOWN_MS = 60 * 1000; // 1 phút

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
    }

    // Validate email cơ bản
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    }

    // Rate limit theo IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const last = recentSubmits.get(ip);
    if (last && Date.now() - last < COOLDOWN_MS) {
      return NextResponse.json({ error: "Gửi quá nhanh, thử lại sau" }, { status: 429 });
    }
    recentSubmits.set(ip, Date.now());

    // Gửi Telegram notification
    await notifyContact({ name, email, message });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}