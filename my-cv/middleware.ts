// middleware.ts (đặt ở root project, ngang hàng với app/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_SECRET = process.env.SESSION_SECRET ?? "my-secret-key";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bảo vệ tất cả route /admin trừ /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== SESSION_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};