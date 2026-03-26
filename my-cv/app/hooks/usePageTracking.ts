"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Bỏ vào layout.tsx hoặc từng page component
// Tự động gọi /api/track mỗi khi user vào trang mới
export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Không track các trang nội bộ
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
    }).catch(() => {}); // silent fail
  }, [pathname]);
}