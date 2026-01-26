"use client";

import { animate } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const items = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");

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

    const navbarHeight = 64;
    const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight;

    smoothScrollTo(y);
  };

  // ✅ Scroll Spy
  useEffect(() => {
  const handleScrollSpy = () => {
    const offset = 100; // chiều cao navbar

    let current = "hero";

    for (const item of items) {
      const section = document.getElementById(item.id);
      if (!section) continue;

      const top = section.getBoundingClientRect().top;

      if (top - offset <= 0) {
        current = item.id;
      }
    }

    setActive(current);
  };

  window.addEventListener("scroll", handleScrollSpy);
  handleScrollSpy();

  return () => window.removeEventListener("scroll", handleScrollSpy);
}, []);


  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => handleScroll("hero")}
          className="text-xl font-bold"
        >
          Dũng.dev
        </button>

        <div className="flex gap-4">
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
                    className="absolute inset-0 rounded-full bg-linear-to-r from-fuchsia-500 to-cyan-500"
                  />
                )}

                <span className="relative z-10 text-white mix-blend-difference">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-13.75">
            <ThemeToggle />
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
