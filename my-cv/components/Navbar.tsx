// components/Navbar.tsx
"use client";

import { animate } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { useI18n } from "@/lib/i18n";
import { usePathname,useRouter } from "next/navigation";

export default function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [active, setActive] = useState("home");
  const router = useRouter();
  const pathname = usePathname();
  const items = [
    { id: "home",     label: t.nav.home },
    { id: "about",    label: t.nav.about },
    { id: "skills",   label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "contact",  label: t.nav.contact },
  ];

  const smoothScrollTo = (targetY: number) => {
    animate(window.scrollY, targetY, {
      duration: 0.9,
      ease: "easeInOut",
      onUpdate(value) {
        window.scrollTo(0, value);
      },
    });
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    smoothScrollTo(y);
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      let current = "home";
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        if (section.getBoundingClientRect().top - 100 <= 0) {
          current = item.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
 const handleLogoClick = () => {
    if (pathname.startsWith("/admin")) {
      router.push("/");
    } else {
      handleScroll("home");
    }
  };
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <button onClick={handleLogoClick} className="text-xl font-bold">
          Dũng.dev
        </button>

        <div className="flex gap-11 items-center">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 relative">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="relative px-4 py-1.5 text-sm font-medium"
              >
                {active === item.id && (
                  <motion.span
                    layoutId="navbar-bubble"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"
                  />
                )}
                <span className="relative z-10 text-white mix-blend-difference">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "vi" : "en")}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold transition-all hover:bg-secondary"
            title="Switch language"
          >
            <span className="text-base leading-none">
              {lang === "en" ? "🇻🇳" : "🇬🇧"}
            </span>
            <span className="text-xs text-muted-foreground">
              {lang === "en" ? "VI" : "EN"}
            </span>
          </button>

          <ThemeToggle />

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}