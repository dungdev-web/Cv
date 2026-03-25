"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIChatbot from "./AIChatbot";
import ProjectRecommender from "./ProjectRecommender";

type Tab = "chat" | "recommend";

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("chat");
  const ref = useRef<HTMLDivElement>(null);

  // Đóng khi click ngoài
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[360px] rounded-2xl border border-white/10 bg-[#0f0f11]/95 backdrop-blur shadow-2xl overflow-hidden"
          >
            {/* Tab bar */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setTab("chat")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  tab === "chat"
                    ? "text-white border-b-2 border-violet-500"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Hỏi về Dũng
              </button>
              <button
                onClick={() => setTab("recommend")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  tab === "recommend"
                    ? "text-white border-b-2 border-violet-500"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Tìm project
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[520px] overflow-y-auto">
              {tab === "chat" ? <AIChatbot /> : <ProjectRecommender />}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-white/20">Powered by Groq · Llama 3.3</span>
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
              >
                Đóng ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-900/50 flex items-center justify-center transition-colors"
        aria-label="AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12"/>
            </motion.svg>
          ) : (
            <motion.svg
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" strokeOpacity="0"/>
              <circle cx="12" cy="12" r="3" fill="white" stroke="none"/>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Pulse ring khi đóng */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-violet-500 opacity-20" />
        )}
      </motion.button>
    </div>
  );
}