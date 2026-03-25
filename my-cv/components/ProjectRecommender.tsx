"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectMatch {
  id: string;
  name: string;
  score: number;
  reason: string;
  pitch: string;
  matchedSkills: string[];
  link?: string;
  github?: string;
}

const EXAMPLE_JDS = [
  "Frontend developer with React, TypeScript, Tailwind CSS",
  "Full-stack Node.js and Firebase for startup",
  "Next.js developer with animation experience",
];

export default function ProjectRecommender() {
  const [jd, setJd] = useState("");
  const [matches, setMatches] = useState<ProjectMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const run = async (text?: string) => {
    const query = text ?? jd.trim();
    if (!query || loading) return;
    if (text) setJd(text);
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd: query }),
      });
      const data = await res.json();
      setMatches(data.matches ?? []);
    } catch {
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <p className="text-sm font-medium">Nhập Job Description hoặc tech stack</p>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Ví dụ: We need a frontend developer with React, TypeScript and animation experience..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition-colors resize-none"
        />

        {/* Example chips */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_JDS.map((ex) => (
            <button
              key={ex}
              onClick={() => run(ex)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>

        <button
          onClick={() => run()}
          disabled={!jd.trim() || loading}
          className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-medium transition-colors"
        >
          {loading ? "Đang phân tích..." : "Tìm project phù hợp →"}
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {searched && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {matches.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                Không tìm thấy project phù hợp.
              </p>
            ) : (
              matches.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border p-4 space-y-2 ${
                    i === 0
                      ? "border-violet-500/50 bg-violet-500/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {i === 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                          ⭐ Phù hợp nhất
                        </span>
                      )}
                      <h3 className="text-sm font-medium">{m.name}</h3>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-violet-400">
                      {m.score}%
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">{m.pitch}</p>
                  <p className="text-xs text-muted-foreground">{m.reason}</p>

                  {m.matchedSkills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.matchedSkills.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 pt-1">
                    {m.link && (
                      <a
                        href={m.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-violet-400 hover:underline"
                      >
                        Xem demo →
                      </a>
                    )}
                    {m.github && (
                      <a
                        href={m.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}