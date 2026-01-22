"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isHover, setIsHover] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 600, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 600, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
    };

    window.addEventListener("mousemove", move);

    const hoverables = document.querySelectorAll("a, button, [data-cursor]");

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        setIsHover(true);

        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // hút nhẹ cursor về tâm element
        mouseX.set(centerX - 16);
        mouseY.set(centerY - 16);
      });

      el.addEventListener("mouseleave", () => {
        setIsHover(false);
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-9999 pointer-events-none rounded-full mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        width: isHover ? 50 : 40,
        height: isHover ? 50 : 40,
        backgroundColor: "white",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    />
  );
}
