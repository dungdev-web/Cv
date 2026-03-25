"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame,Github } from "lucide-react";

interface Language {
  name: string;
  color: string;
  percent: number;
}

interface Commit {
  repo: string;
  message: string;
  date: string;
}

interface GitHubData {
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalRepos: number;
  streak: number;
  languages: Language[];
  recentCommits: Commit[];
  contributionGrid: { count: number; date: string }[][];
}

// Màu cho ô contribution dựa trên số commit
function gridColor(count: number) {
  if (count === 0) return "bg-white/5";
  if (count <= 2) return "bg-violet-900/60";
  if (count <= 5) return "bg-violet-700/70";
  if (count <= 9) return "bg-violet-500/80";
  return "bg-violet-400";
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "hôm nay";
  if (days === 1) return "hôm qua";
  if (days < 7) return `${days} ngày trước`;
  if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
  return `${Math.floor(days / 30)} tháng trước`;
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null; // fail silently — không hiện nếu lỗi

  const stats = [
    { label: "Contributions", value: data?.totalContributions },
    { label: "Commits", value: data?.totalCommits },
    { label: "Pull Requests", value: data?.totalPRs },
    { label: "Repos", value: data?.totalRepos },
  ];

  return (
    <section className="w-full  mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2"> <Github/>  <h2 className="text-2xl font-medium">GitHub Activity</h2></div>
        {data?.streak ? (
          <span className="flex items-center gap-1.5 text-sm text-orange-400 font-medium">
            <span className="text-base"><Flame /></span>
            {data.streak} ngày streak
          </span>
        ) : (
          <div className="h-5 w-24 rounded animate-pulse" />
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border shadow-sm bg-card  p-4 text-center"
          >
            {value !== undefined ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-medium tabular-nums"
              >
                {value.toLocaleString()}
              </motion.p>
            ) : (
              <div className="h-8 rounded animate-pulse mx-auto w-16" />
            )}
            <p className="text-xs  mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Contribution grid */}
      <div className="rounded-xl border  p-4">
        <p className="text-xs  mb-3">Contribution — 20 tuần gần nhất</p>
        {data ? (
          <div className="flex gap-1 overflow-x-auto pb-1">
            {data.contributionGrid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.date}: ${day.count} contributions`}
                    className={`w-3 h-3 rounded-sm ${gridColor(day.count)} transition-opacity hover:opacity-70`}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="w-3 h-3 rounded-sm animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages + Recent commits */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Top languages */}
        <div className="rounded-xl border  p-4 space-y-3">
          <p className="text-xs ">Top languages</p>
          {data ? (
            <>
              {/* Color bar */}
              <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                {data.languages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percent}%`, background: lang.color }}
                    title={`${lang.name} ${lang.percent}%`}
                  />
                ))}
              </div>
              {/* List */}
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: lang.color }}
                      />
                      <span >{lang.name}</span>
                    </div>
                    <span className="text-xs tabular-nums">{lang.percent}%</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 rounded animate-pulse" style={{ width: `${80 - i * 12}%` }} />
              ))}
            </div>
          )}
        </div>

        {/* Recent commits */}
        <div className="rounded-xl border  p-4 space-y-3">
          <p className="text-xs ">Recent commits</p>
          {data ? (
            <div className="space-y-3">
              {data.recentCommits.length === 0 ? (
                <p className="text-sm">Không có public commit gần đây</p>
              ) : (
                data.recentCommits.map((commit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                      <span className="text-xs text-violet-300 font-mono truncate">{commit.repo}</span>
                      <span className="text-xs ml-auto flex-shrink-0">{timeAgo(commit.date)}</span>
                    </div>
                    <p className="text-xs pl-3.5 truncate">{commit.message}</p>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 rounded animate-pulse w-1/2" />
                  <div className="h-3 rounded animate-pulse w-3/4" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}