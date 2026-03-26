"use client";
import dynamic from 'next/dynamic';
import { Providers } from "./providers";
import "./globals.css";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { I18nProvider } from "@/lib/i18n";
import { usePageTracking } from './hooks/usePageTracking';

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), { ssr: false });

function TrackingProvider({ children }: { children: React.ReactNode }) {
  usePageTracking();
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // ✅ Fix 2: Cleanup timer tránh memory leak
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <I18nProvider>
            {loading ? (
              <Loader />
            ) : (
              <TrackingProvider>
                <CustomCursor />
                <Navbar />
                {children}
                <Toaster richColors position="bottom-right" />
                <Footer />
              </TrackingProvider>
            )}
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}