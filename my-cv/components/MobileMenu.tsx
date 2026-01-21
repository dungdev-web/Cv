"use client";

import * as motion from "motion/react-client";
import { useState } from "react";
import MenuToggle from "./MenuToggle";
import { animate } from "framer-motion";

const menuItems = ["about", "skills", "projects", "contact"];

const sidebarVariants = {
  open: {
    clipPath: "circle(1500px at 90% 40px)",
    transition: { stiffness: 20, restDelta: 2 },
  },
  closed: {
    clipPath: "circle(24px at 90% 40px)",
    transition: { stiffness: 400, damping: 40 },
  },
};

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 64;

    animate(window.scrollY, y, {
      duration: 0.9,
      ease: "easeInOut",
      onUpdate(v) {
        window.scrollTo(0, v);
      },
    });

    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle button (navbar) */}
      <div className="fixed top-4 right-4 z-60 md:hidden">
        <MenuToggle isOpen={isOpen} toggle={() => setIsOpen((v) => !v)} />
      </div>

      {/* Sidebar panel */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed -top-0.75 right-1.5 z-50 h-full w-75 bg-sky-100 dark:bg-sky-900/40 backdrop-blur shadow-2xl"
      >
        {/* Close button */}

        {/* Menu */}
        <motion.ul
          className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 text-2xl bg-sky-100 font-bold dark:bg-sky-900/40 backdrop-blur shadow-2xl w-full h-[91vh]"
          variants={{
            open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            closed: {
              transition: { staggerChildren: 0.05, staggerDirection: -1 },
            },
          }}
        >
          {menuItems.map((item) => (
            <motion.li
              key={item}
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: 20 },
              }}
            >
              <a
                href={`#${item}`}
                onClick={() => setIsOpen(false)}
                className="capitalize"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.aside>
    </>
  );
}
