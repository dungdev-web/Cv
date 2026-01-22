"use client";
import { Providers } from "./providers";
import "./globals.css";
import { useState,useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "sonner"
import Loader from "@/components/Loader";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000) // ⏱ 5 giây

    return () => clearTimeout(timer)
  }, [])
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
         <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
