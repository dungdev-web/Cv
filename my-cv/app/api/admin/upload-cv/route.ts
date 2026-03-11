// app/api/admin/upload-cv/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put, list, get } from "@vercel/blob";

const SESSION_SECRET = process.env.SESSION_SECRET ?? "my-secret-key";

// ─────────────────────────────────────────
// POST — upload CV
// ─────────────────────────────────────────
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== SESSION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("cv") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files allowed" },
      { status: 400 },
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large (max 10MB)" },
      { status: 400 },
    );
  }

  const filename = `cv-${Date.now()}.pdf`;

  const blob = await put(filename, file, {
    access: "public",
  });

  return NextResponse.json({
    ok: true,
    url: blob.url,
    filename,
  });
}

// ─────────────────────────────────────────
// GET — list CV
// ─────────────────────────────────────────
export async function GET() {
  try {
    const { blobs } = await list();

    const files = blobs.filter((b) => b.pathname.endsWith(".pdf"));

    let active: string | null = null;

    const activeBlob = blobs.find((b) => b.pathname === "active-cv.json");
    // console.log("ALL BLOBS:", blobs.map((b) => b.pathname));
    if (activeBlob) {
      const res = await fetch( `${activeBlob.url}?t=${Date.now()}`, { cache: "no-store" });

      if (res.ok) {
        const text = await res.text();

        // console.log("ACTIVE FILE RAW:", text);

        if (text) {
          try {
            const data = JSON.parse(text);
            active = data.filename ?? null;
          } catch (err) {
            console.error("JSON parse error", err);
          }
        }
      }
    }

    return Response.json({
      files,
      active,
    });
  } catch (err) {
    console.error("GET upload-cv error:", err);

    return Response.json({ files: [], active: null }, { status: 500 });
  }
}

// ─────────────────────────────────────────
// PATCH — set active CV
// ─────────────────────────────────────────
export async function PATCH(req: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== SESSION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename } = await req.json();

  await put("active-cv.json", new Blob([JSON.stringify({ filename })]), {
    access: "public",
    allowOverwrite: true,
  });

  return NextResponse.json({
    ok: true,
    active: filename,
  });
}
