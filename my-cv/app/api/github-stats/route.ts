import { NextResponse } from "next/server";

const GITHUB_USERNAME = "dungdev-web"; // đổi nếu cần
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // optional nhưng tăng rate limit lên 5000/h

const headers: HeadersInit = {
  "Content-Type": "application/json",
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
};

// ── GraphQL: lấy contribution stats + top languages ──────────────────────────
const STATS_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalRepositoriesWithContributedCommits
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
    repositories(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }, ownerAffiliations: OWNER) {
      nodes {
        name
        stargazerCount
        languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node { name color }
          }
        }
      }
    }
  }
}`;

async function fetchGraphQL(query: string, variables: object) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // ISR: cache 1 giờ
  });
  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
  return res.json();
}

// ── REST: lấy recent events (commits) ────────────────────────────────────────
async function fetchRecentCommits() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const events = await res.json();
  return events
    .filter((e: { type: string }) => e.type === "PushEvent")
    .slice(0, 5)
    .map((e: {
      repo: { name: string };
      payload: { commits: { message: string }[] };
      created_at: string;
    }) => ({
      repo: e.repo.name.replace(`${GITHUB_USERNAME}/`, ""),
      message: e.payload.commits?.[0]?.message?.split("\n")[0] ?? "Update",
      date: e.created_at,
    }));
}

// ── Tính current streak từ contribution calendar ──────────────────────────────
function calcStreak(weeks: { contributionDays: { contributionCount: number; date: string }[] }[]) {
  const days = weeks.flatMap((w) => w.contributionDays).reverse();
  let streak = 0;
  for (const day of days) {
    if (day.contributionCount > 0) streak++;
    else break;
  }
  return streak;
}

// ── Tổng hợp top languages từ tất cả repos ───────────────────────────────────
function calcLanguages(repos: {
  languages: { edges: { size: number; node: { name: string; color: string } }[] };
}[]) {
  const map = new Map<string, { size: number; color: string }>();
  for (const repo of repos) {
    for (const { size, node } of repo.languages.edges) {
      const existing = map.get(node.name);
      map.set(node.name, {
        size: (existing?.size ?? 0) + size,
        color: node.color ?? "#888",
      });
    }
  }
  const total = [...map.values()].reduce((s, v) => s + v.size, 0);
  return [...map.entries()]
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 6)
    .map(([name, { size, color }]) => ({
      name,
      color,
      percent: Math.round((size / total) * 100),
    }));
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const [graphqlData, recentCommits] = await Promise.all([
      fetchGraphQL(STATS_QUERY, { username: GITHUB_USERNAME }),
      fetchRecentCommits(),
    ]);

    const user = graphqlData.data?.user;
    if (!user) throw new Error("User not found");

    const contrib = user.contributionsCollection;
    const weeks = contrib.contributionCalendar.weeks;
    const repos = user.repositories.nodes;

    return NextResponse.json({
      totalContributions: contrib.contributionCalendar.totalContributions,
      totalCommits: contrib.totalCommitContributions,
      totalPRs: contrib.totalPullRequestContributions,
      totalRepos: contrib.totalRepositoriesWithContributedCommits,
      streak: calcStreak(weeks),
      languages: calcLanguages(repos),
      recentCommits,
      // Contribution grid: lấy 20 tuần gần nhất để hiển thị
      contributionGrid: weeks.slice(-20).map(
        (w: { contributionDays: { contributionCount: number; date: string }[] }) =>
          w.contributionDays.map((d) => ({
            count: d.contributionCount,
            date: d.date,
          }))
      ),
    });
  } catch (err) {
    console.error("GitHub stats error:", err);
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}