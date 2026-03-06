// app/skills/page.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Layers,
  Palette,
  Zap,
  Wrench,
  TrendingUp,
  Database,
  Smartphone,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

// ── Data ───────────────────────────────────────────────────────────────────────
const skills = [
  {
    name: "HTML",
    level: "Advanced" as const,
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    border: "border-orange-500/30",
    icon: "html5",
    color: "e34f26",
  },
  {
    name: "CSS",
    level: "Advanced" as const,
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-400/30",
    icon: "css",
    color: "1572b6",
  },
  {
    name: "JavaScript",
    level: "Advanced" as const,
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-400/30",
    icon: "javascript",
    color: "f7df1e",
  },
  {
    name: "TypeScript",
    level: "Intermediate" as const,
    bg: "bg-blue-600/10",
    text: "text-blue-500",
    border: "border-blue-500/30",
    icon: "typescript",
    color: "3178c6",
  },
  {
    name: "React",
    level: "Intermediate" as const,
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-400/30",
    icon: "react",
    color: "61dafb",
  },
  {
    name: "Next.js",
    level: "Beginner" as const,
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    border: "border-slate-400/30",
    icon: "nextdotjs",
    color: "ffffff",
  },
  {
    name: "Tailwind",
    level: "Advanced" as const,
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    border: "border-teal-400/30",
    icon: "tailwindcss",
    color: "06b6d4",
  },
  {
    name: "Node.js",
    level: "Beginner" as const,
    bg: "bg-green-500/10",
    text: "text-green-500",
    border: "border-green-500/30",
    icon: "nodedotjs",
    color: "5fa04e",
  },
  {
    name: "NestJS",
    level: "Beginner" as const,
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-400/30",
    icon: "nestjs",
    color: "e0234e",
  },
  {
    name: "MongoDB",
    level: "Beginner" as const,
    bg: "bg-green-600/10",
    text: "text-green-500",
    border: "border-green-500/30",
    icon: "mongodb",
    color: "47a248",
  },
  {
    name: "PostgreSQL",
    level: "Beginner" as const,
    bg: "bg-blue-700/10",
    text: "text-blue-600",
    border: "border-blue-600/30",
    icon: "postgresql",
    color: "336791",
  },
  {
    name: "Firebase",
    level: "Intermediate" as const,
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-400/30",
    icon: "firebase",
    color: "dd2c00",
  },
  {
    name: "MySQL",
    level: "Beginner" as const,
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-400/30",
    icon: "mysql",
    color: "4479a1",
  },
  {
    name: "Docker",
    level: "Beginner" as const,
    bg: "bg-blue-400/10",
    text: "text-blue-300",
    border: "border-blue-300/30",
    icon: "docker",
    color: "2496ed",
  },
];

const levelConfig = {
  Advanced: {
    label: "Advanced",
    cls: "bg-green-500/15 text-green-500 border-green-500/30",
  },
  Intermediate: {
    label: "Intermediate",
    cls: "bg-blue-500/15 text-blue-400 border-blue-400/30",
  },
  Beginner: {
    label: "Beginner",
    cls: "bg-orange-500/15 text-orange-400 border-orange-400/30",
  },
} as const;

const tools = [
  { name: "VS Code", icon: Code2 },
  { name: "Git / GitHub", icon: Code2 },
  { name: "Figma", icon: Palette },
  { name: "Postman", icon: Zap },
  { name: "Vercel", icon: TrendingUp },
  { name: "Firebase", icon: Zap },
  { name: "Docker", icon: Layers },
  { name: "Excel", icon: TrendingUp },
  { name: "Canva", icon: Palette },
  { name: "Affinity Designer", icon: Palette },
];

const expertiseKeys = [
  { icon: TrendingUp, key: "learning" as const },
  { icon: Code2, key: "cleanCode" as const },
  { icon: Palette, key: "uiux" as const },
  { icon: Smartphone, key: "responsive" as const },
  { icon: Database, key: "performance" as const },
  { icon: Zap, key: "problem" as const },
  { icon: Wrench, key: "debug" as const },
  { icon: TrendingUp, key: "collab" as const },
];

const spiderData = [
  { label: "HTML/CSS", value: 85 },
  { label: "JavaScript", value: 80 },
  { label: "React", value: 75 },
  { label: "TypeScript", value: 70 },
  { label: "Next.js", value: 65 },
  { label: "Tailwind", value: 80 },
];

// ── Tilt hook ──────────────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.04,1.04,1.04)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };
  return { ref, onMove, onLeave };
}

// ── Skill Grid Card ────────────────────────────────────────────────────────────
function SkillGridCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const tilt = useTilt();
  const lv = levelConfig[skill.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={{
          transition: "transform 0.18s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <Card
          className={`p-4 border-2 ${skill.border} ${skill.bg} hover:shadow-lg transition-all group relative overflow-hidden cursor-default`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div
            className="relative flex flex-col items-center gap-2 text-center"
            style={{ transform: "translateZ(16px)" }}
          >
            {/* Emoji icon */}
            <img
              src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color}`}
              alt={skill.name}
              className="w-8 h-8"
            />{" "}
            {/* Name */}
            <span className={`font-bold text-sm ${skill.text}`}>
              {skill.name}
            </span>
            {/* Level badge */}
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${lv.cls}`}
            >
              {lv.label}
            </span>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

// ── Expertise Card ─────────────────────────────────────────────────────────────
function ExpertiseCard({
  iconComp: Icon,
  title,
  description,
  index,
}: {
  iconComp: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  const tilt = useTilt();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.07 }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={{
          transition: "transform 0.18s ease-out",
          transformStyle: "preserve-3d",
          height: "100%",
        }}
      >
        <Card className="p-5 h-full border-2 hover:border-primary/30 transition-all group hover:shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative" style={{ transform: "translateZ(18px)" }}>
            <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <h4 className="font-semibold mb-1.5 text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

// ── Spider Chart ───────────────────────────────────────────────────────────────
function SpiderChart({ title }: { title: string }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 110;
  const step = 360 / spiderData.length;
  const pt = (angle: number, dist: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return { x: cx + dist * Math.cos(rad), y: cy + dist * Math.sin(rad) };
  };
  const dataPoints = spiderData
    .map((d, i) => {
      const p = pt(i * step, (d.value / 100) * r);
      return `${p.x},${p.y}`;
    })
    .join(" ");
  const gridPolygon = (pct: number) =>
    spiderData
      .map((_, i) => {
        const p = pt(i * step, (pct / 100) * r);
        return `${p.x},${p.y}`;
      })
      .join(" ");

  return (
    <Card className="p-6 border-2 hover:border-primary/30 transition-all relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {title}
        </h3>
        <div className="flex justify-center">
          <svg
            width="100%"
            viewBox={`0 0 ${size} ${size}`}
            style={{ maxWidth: size }}
          >
            {/* Grid polygons — màu trắng cố định để thấy cả dark/light */}
            {[20, 40, 60, 80, 100].map((lvl) => (
              <polygon
                key={lvl}
                points={gridPolygon(lvl)}
                fill="none"
                stroke="rgba(128,128,128,0.35)"
                strokeWidth={1}
              />
            ))}

            {/* Axis lines */}
            {spiderData.map((_, i) => {
              const end = pt(i * step, r);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={end.x}
                  y2={end.y}
                  stroke="rgba(128,128,128,0.35)"
                  strokeWidth={1}
                />
              );
            })}

            {/* Data polygon */}
            <motion.polygon
              points={dataPoints}
              fill="#6366f1"
              fillOpacity={0.3}
              stroke="#818cf8"
              strokeWidth={2.5}
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Dots */}
            {spiderData.map((d, i) => {
              const p = pt(i * step, (d.value / 100) * r);
              return (
                <motion.circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={5}
                  fill="#818cf8"
                  stroke="#1e1e2e"
                  strokeWidth={1.5}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              );
            })}

            {/* Labels */}
            {spiderData.map((d, i) => {
              const p = pt(i * step, r + 22);
              return (
                <text
                  key={i}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill="#a5b4fc"
                  opacity={1}
                >
                  {d.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </Card>
  );
}

// ── Horizontal Typewriter Node ────────────────────────────────────────────────
function HorizontalTypewriterNode({
  item,
  index,
}: {
  item: { period: string; title: string; desc: string; color: string };
  index: number;
}) {
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const type = (
      text: string,
      setter: (s: string) => void,
      onDone: () => void,
    ) => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        setter(text.slice(0, ++i));
        if (i < text.length) setTimeout(tick, 30);
        else onDone();
      };
      tick();
    };
    const t = setTimeout(() => {
      type(item.title, setTitleText, () =>
        setTimeout(() => type(item.desc, setDescText, () => {}), 120),
      );
    }, index * 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [started, item.title, item.desc, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="flex flex-col items-center text-center gap-0"
    >
      {/* Dot */}
      <div
        className={`w-3 h-3 rounded-full ${item.color} ring-2 ring-background mb-3 shrink-0 z-10`}
      />

      {/* Content */}
      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
        {item.period}
      </span>
      <p className="text-xs font-semibold leading-tight min-h-[32px]">
        {titleText}
        {titleText.length < item.title.length && (
          <span className="inline-block w-0.5 h-3 bg-primary ml-0.5 animate-pulse align-middle" />
        )}
      </p>
      {titleText === item.title && (
        <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
          {descText}
          {descText.length < item.desc.length && (
            <span className="inline-block w-0.5 h-2.5 bg-muted-foreground ml-0.5 animate-pulse align-middle" />
          )}
        </p>
      )}
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Skills() {
  const { t } = useI18n();
  const [showAllSkills, setShowAllSkills] = useState(false);
  const visibleSkills = showAllSkills ? skills : skills.slice(0, 8);
  return (
    <section
      id="skills"
      className="relative container mx-auto px-4 py-20 scroll-mt-20 overflow-hidden"
    >
      {/* Ambient */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Badge className="mb-4 px-4 py-2">
          <Wrench className="w-4 h-4 mr-2" />
          {t.skills.badge}
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          {t.skills.heading1}{" "}
          <span className="text-primary">{t.skills.heading2}</span>
          {t.skills.heading3}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.skills.subtitle}
        </p>
      </motion.div>

      {/* ── Row 1: Skill grid (trái) + Spider chart (phải) ── */}
      <div className="grid lg:grid-cols-5 gap-8 mb-10">
        {/* Skill grid — 3/5 */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-4"
          >
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              {t.skills.coreTitle}
            </h3>
            <span className="text-3xl font-black text-primary">
              {skills.length}+
            </span>
          </motion.div>

          {/* Level legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 mb-5 flex-wrap"
          >
            {(["Advanced", "Intermediate", "Beginner"] as const).map((lv) => (
              <span
                key={lv}
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${levelConfig[lv].cls}`}
              >
                {lv}
              </span>
            ))}
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {visibleSkills.map((skill, i) => (
              <SkillGridCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          {!showAllSkills && skills.length > 8 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowAllSkills(true)}
              className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              <span>+{skills.length - 8} more technologies</span>
              <span className="text-lg">↓</span>
            </motion.button>
          )}

          {showAllSkills && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowAllSkills(false)}
              className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              <span>Show less ↑</span>
            </motion.button>
          )}

          {/* Mini Timeline — Horizontal Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6"
          >
            <h4 className="text-base font-bold mb-5 flex items-center gap-2 text-muted-foreground">
              <span className="w-4 h-0.5 bg-primary inline-block" />
              {t.skills.learning}
            </h4>

            {/* Horizontal track */}
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute top-2.5 left-0 right-0 h-px bg-border" />

              <div className="grid grid-cols-5 gap-1">
                {[
                  {
                    period: "2024 Q1",
                    title: "Web Dev",
                    desc: "HTML, CSS, JS",
                    color: "bg-orange-500",
                  },
                  {
                    period: "2024 Q2",
                    title: "React & UI",
                    desc: "React, MUI, Tailwind",
                    color: "bg-cyan-500",
                  },
                  {
                    period: "2024 Q3",
                    title: "Full-stack",
                    desc: "Node.js, Firebase, API",
                    color: "bg-green-500",
                  },
                  {
                    period: "2024 Q4",
                    title: "Next & TS",
                    desc: "Next.js, TypeScript",
                    color: "bg-blue-500",
                  },
                  {
                    period: "2025 Now",
                    title: "Projects & AI",
                    desc: "NestJS, Docker, AI",
                    color: "bg-purple-500",
                  },
                ].map((item, i) => (
                  <HorizontalTypewriterNode key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: tools + spider — 2/5 */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-5 border-2 hover:border-primary/30 transition-all relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{t.skills.toolsTitle}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="px-2.5 py-1.5 text-xs font-medium hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        <tool.icon className="w-3 h-3 mr-1" />
                        {tool.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Spider chart */}
          <SpiderChart title={t.skills.radarTitle} />
        </div>
      </div>

      {/* ── Row 2: Expertise ── */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold flex items-center gap-2 mb-6"
      >
        <Zap className="w-6 h-6 text-primary" />
        {t.skills.expertiseTitle}
      </motion.h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {expertiseKeys.map((item, i) => (
          <ExpertiseCard
            key={item.key}
            iconComp={item.icon}
            title={t.skills.expertise[item.key].title}
            description={t.skills.expertise[item.key].description}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
