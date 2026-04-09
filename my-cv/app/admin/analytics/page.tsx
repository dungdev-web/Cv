// ============================================================
// app/admin/analytics/page.tsx
// Dashboard xem project nào được hỏi nhiều nhất
// Gọi GET /api/chat/analytics để lấy data
// ============================================================

"use client";

import { useEffect, useState } from "react";

interface AnalyticsData {
  topProjects: { id: string; score: number }[];
  totalMentions: number;
  intentBreakdown: Record<string, number>;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/chat/analytics")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-8 text-gray-500">Loading analytics…</p>;

  const maxScore = Math.max(...data.topProjects.map((p) => p.score), 1);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold">Portfolio chat analytics</h1>

      <section>
        <h2 className="text-lg font-medium mb-4">
          Most asked projects (decay-weighted)
        </h2>
        <div className="space-y-3">
          {data.topProjects.map((p) => (
            <div key={p.id}>
              <div className="flex justify-between text-sm mb-1">
                <span>{p.id}</span>
                <span className="text-gray-400">{p.score.toFixed(1)}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-2 rounded-full bg-indigo-500 transition-all"
                  style={{ width: `${(p.score / maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-4">Intent breakdown</h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(data.intentBreakdown).map(([intent, count]) => (
            <div
              key={intent}
              className="border rounded-lg p-3 flex justify-between"
            >
              <span className="text-sm">{intent.replace("_", " ")}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-gray-400">
        Data is in-memory — resets on server restart. Upgrade to Redis for
        persistence.
      </p>
    </div>
  );
}