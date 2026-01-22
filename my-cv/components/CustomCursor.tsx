"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isHover, setIsHover] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
    };

    window.addEventListener("mousemove", move);

    // detect hover on interactive elements
    const addHoverEvents = () => {
      const hoverables = document.querySelectorAll("a, button");

      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHover(true));
        el.addEventListener("mouseleave", () => setIsHover(false));
      });
    };

    addHoverEvents();

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
        width: isHover ? 32 : 16,
        height: isHover ? 32 : 16,
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
