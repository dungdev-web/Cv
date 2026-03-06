// app/api/admin/upload-cv/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const SESSION_SECRET = process.env.SESSION_SECRET ?? "my-secret-key";

export async function POST(req: Request) {
  // ── Kiểm tra auth ──────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== SESSION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Lấy file từ form data ──────────────────────────────────────────────────
  const formData = await req.formData();
  const file = formData.get("cv") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  // ── Lưu file vào public/pdf/ ───────────────────────────────────────────────
  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "pdf");

  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "cv.pdf"), buffer);

  return NextResponse.json({ ok: true, path: "/pdf/cv.pdf" });
}