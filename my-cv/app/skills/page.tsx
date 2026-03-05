// app/skills/page.tsx
"use client";

import { useRef } from "react";
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

const skills = [
  {
    name: "HTML / CSS",
    level: 85,
    icon: Code2,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "JavaScript",
    level: 80,
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "TypeScript",
    level: 70,
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "React",
    level: 75,
    icon: Layers,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Next.js",
    level: 65,
    icon: Layers,
    color: "from-gray-700 to-gray-900",
  },
  {
    name: "Tailwind CSS",
    level: 80,
    icon: Palette,
    color: "from-teal-500 to-cyan-500",
  },
];

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
    el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.04,1.04,1.04)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };
  return { ref, onMove, onLeave };
}

// ── Skill bar card ─────────────────────────────────────────────────────────────
function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const tilt = useTilt();
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
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
        <Card className="p-5 hover:shadow-xl transition-shadow border-2 hover:border-primary/30 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          <div
            className="flex items-center justify-between mb-3"
            style={{ transform: "translateZ(16px)" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary group-hover:scale-110 transition-transform">
                <skill.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-lg">{skill.name}</span>
            </div>
            <motion.span
              className="text-sm font-bold text-primary tabular-nums"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.08 }}
            >
              {skill.level}%
            </motion.span>
          </div>
          <div
            className="h-2.5 w-full rounded-full bg-secondary overflow-hidden"
            style={{ transform: "translateZ(8px)" }}
          >
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.08 }}
            >
              <div
                className="absolute inset-0 blur-sm opacity-60"
                style={{ background: "inherit" }}
              />
            </motion.div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

// ── Expertise card ─────────────────────────────────────────────────────────────
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

// ── Spider chart ───────────────────────────────────────────────────────────────
function SpiderChart({ title }: { title: string }) {
  const size = 355;
  const cx = size / 2;
  const cy = size / 2;
  const r = 108;
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
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="p-6 border-2 hover:border-primary/30 transition-all relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {title}
          </h3>
          <div className="flex justify-center">
            <svg
              width="100%"
              viewBox={`0 0 ${size} ${size}`}
              style={{ maxWidth: size }}
            >
              {[20, 40, 60, 80, 100].map((lvl) => (
                <polygon
                  key={lvl}
                  points={gridPolygon(lvl)}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.08}
                  strokeWidth={1}
                />
              ))}
              {spiderData.map((_, i) => {
                const end = pt(i * step, r);
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={end.x}
                    y2={end.y}
                    stroke="currentColor"
                    strokeOpacity={0.1}
                    strokeWidth={1}
                  />
                );
              })}
              <motion.polygon
                points={dataPoints}
                fill="hsl(var(--primary))"
                fillOpacity={0.15}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
              {spiderData.map((d, i) => {
                const p = pt(i * step, (d.value / 100) * r);
                return (
                  <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill="hsl(var(--primary))"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  />
                );
              })}
              {spiderData.map((d, i) => {
                const p = pt(i * step, r + 18);
                return (
                  <text
                    key={i}
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={11}
                    fontWeight={600}
                    fill="currentColor"
                    opacity={0.7}
                  >
                    {d.label}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Skills() {
  const { t } = useI18n();

  return (
    <section
      id="skills"
      className="relative container mx-auto px-4 py-20 scroll-mt-20 overflow-hidden"
    >
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

      {/* Row 1 */}
      <div className="grid lg:grid-cols-5 gap-8 mb-8">
        <div className="lg:col-span-3 space-y-4">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <Code2 className="w-6 h-6 text-primary" />
            {t.skills.coreTitle}
          </motion.h3>
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Stat */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 border-2 hover:border-primary/30 transition-all text-center bg-gradient-to-br from-primary/5 to-transparent">
              <div className="text-5xl font-black text-primary mb-1">6+</div>
              <div className="text-sm text-muted-foreground font-medium">
                {t.skills.techMastered}
              </div>
            </Card>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 border-2 hover:border-primary/30 transition-all relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{t.skills.toolsTitle}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="px-3 py-2 text-sm font-medium hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        <tool.icon className="w-3.5 h-3.5 mr-1.5" />
                        {tool.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          <SpiderChart title={t.skills.radarTitle} />
        </div>
      </div>

      {/* Row 2: Expertise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Zap className="w-6 h-6 text-primary" />
          {t.skills.expertiseTitle}
        </h3>
      </motion.div>

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
