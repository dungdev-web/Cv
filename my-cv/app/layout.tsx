"use client";
import dynamic from 'next/dynamic';
import { Providers } from "./providers";
import "./globals.css";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { I18nProvider } from "@/lib/i18n";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const timer = setTimeout(() => {
    setLoading(false);      
    },1000)
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <I18nProvider>
          {loading ? (
            <Loader />
          ) : (
            <>
              <CustomCursor /> 
              <Navbar />
              {children}
              <Toaster richColors position="bottom-right" />
              <Footer />
            </>
          )}
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
