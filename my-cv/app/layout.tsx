import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {" "}
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
