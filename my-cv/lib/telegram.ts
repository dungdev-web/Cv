const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

function now() {
  return new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

async function send(text: string) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !CHAT_ID) return;
  try {
    await fetch(TELEGRAM_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("Telegram notify error:", err);
  }
}

// ── 3 loại thông báo ──────────────────────────────────────────────────────────

export async function notifyVisitor(params: {
  page: string;
  country?: string;
  city?: string;
  ua?: string;
}) {
  const device = parseUA(params.ua);
  const location = [params.city, params.country].filter(Boolean).join(", ") || "Unknown";

  await send(
    `🔔 <b>Visitor mới!</b>\n` +
    `📍 Trang: <code>${params.page}</code>\n` +
    `🌍 Vị trí: ${location}\n` +
    `🖥️ Thiết bị: ${device}\n` +
    `🕐 ${now()}`
  );
}

export async function notifyChat(params: {
  question: string;
  country?: string;
  ua?: string;
}) {
  const device = parseUA(params.ua);
  const preview = params.question.slice(0, 120) + (params.question.length > 120 ? "..." : "");

  await send(
    `💬 <b>Chat mới từ chatbot</b>\n` +
    `❓ "${preview}"\n` +
    `🖥️ ${device}${params.country ? ` · ${params.country}` : ""}\n` +
    `🕐 ${now()}`
  );
}

export async function notifyContact(params: {
  name: string;
  email: string;
  message: string;
}) {
  const preview = params.message.slice(0, 150) + (params.message.length > 150 ? "..." : "");

  await send(
    `📩 <b>Contact form mới!</b>\n` +
    `👤 ${params.name} — <code>${params.email}</code>\n` +
    `💬 "${preview}"\n` +
    `🕐 ${now()}`
  );
}

// ── Helper: parse User-Agent thành chuỗi ngắn gọn ────────────────────────────
function parseUA(ua?: string): string {
  if (!ua) return "Unknown";
  const browser =
    ua.includes("Chrome") ? "Chrome" :
    ua.includes("Firefox") ? "Firefox" :
    ua.includes("Safari") ? "Safari" :
    ua.includes("Edge") ? "Edge" : "Browser";
  const os =
    ua.includes("Windows") ? "Windows" :
    ua.includes("Mac") ? "macOS" :
    ua.includes("iPhone") ? "iPhone" :
    ua.includes("Android") ? "Android" :
    ua.includes("Linux") ? "Linux" : "Unknown OS";
  return `${browser} · ${os}`;
}