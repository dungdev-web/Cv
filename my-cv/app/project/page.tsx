// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// app/project/page.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"use client";
import { Project } from "@/lib/type";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { projects } from "../data/projects";
import { useI18n } from "@/lib/i18n";

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } as const;
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95, y: 20 },
} as const;

function TiltCard({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2; const cy = rect.height / 2;
    el.style.transform = `perspective(800px) rotateX(${((y - cy) / cy) * -12}deg) rotateY(${((x - cx) / cx) * 12}deg) scale3d(1.03,1.03,1.03)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.12) 0%, transparent 65%)`;
      glowRef.current.style.opacity = "1";
    }
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out", willChange: "transform", cursor: "pointer", position: "relative", borderRadius: "var(--radius)" }}>
      <div ref={glowRef} style={{ position: "absolute", inset: 0, borderRadius: "inherit", opacity: 0, transition: "opacity 0.2s", pointerEvents: "none", zIndex: 10 }} />
      {children}
    </div>
  );
}

export default function Projects() {
  const { t } = useI18n();
  const [activeTag, setActiveTag] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  const filtered = activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="container mx-auto px-4 py-24 scroll-mt-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">My <span>Projects</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.projects.subtitle}</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {allTags.map((tag) => (
          <Button key={tag} variant={activeTag === tag ? "default" : "outline"} size="sm" onClick={() => setActiveTag(tag)} className="rounded-full">{tag}</Button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <TiltCard onClick={() => setSelectedProject(project)}>
                <Card className="overflow-hidden group h-full flex flex-col hover:shadow-2xl transition-shadow duration-300" style={{ transformStyle: "preserve-3d" }}>
                  <div className="relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" style={{ transform: "translateZ(20px)" }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">{t.projects.viewDetail}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(10px)" }}>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => <Badge key={tag} variant="secondary" className="rounded-full">{tag}</Badge>)}
                    </div>
                    <div className="flex gap-3">
                      {project.demo && (
                        <Button size="sm" className="gap-2 flex-1" onClick={(e) => { e.stopPropagation(); if (project.demo === "#" || !project.demo) { setComingSoon(t.projects.demoSoon); return; } window.open(project.demo, "_blank"); }}>
                          <ExternalLink className="w-4 h-4" />Demo
                        </Button>
                      )}
                      {project.github && (
                        <MagneticButton>
                          <Button size="sm" variant="outline" className="gap-2 flex-1" onClick={(e) => { e.stopPropagation(); if (project.github === "#") { setComingSoon(t.projects.codeSoon); } else { window.open(project.github, "_blank"); } }}>
                            <Github className="w-4 h-4" />Code
                          </Button>
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div variants={backdropVariants} initial="hidden" animate="visible" exit="exit" onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div variants={modalVariants} onClick={(e) => e.stopPropagation()} className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 rounded-full p-2 transition-all duration-200 hover:scale-110"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => <Badge key={tag} className="rounded-full bg-blue-100 text-blue-800">{tag}</Badge>)}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{t.projects.description}</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.fullDescription}</p>
                </div>
                {selectedProject.features && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">{t.projects.mainFeatures}</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, idx) => (
                        <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 bg-blue-600 rounded-full" />{feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex gap-3">
                  {selectedProject.demo && (
                    <Button size="lg" className="gap-2 flex-1" onClick={() => { if (selectedProject.demo === "#") { setComingSoon(t.projects.demoSoon); } else { window.open(selectedProject.demo, "_blank"); } }}>
                      <ExternalLink className="w-5 h-5" />{t.projects.viewDemo}
                    </Button>
                  )}
                  {selectedProject.github && (
                    <Button size="lg" variant="outline" className="gap-2 flex-1" asChild>
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5" />{t.projects.viewCode}</a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {comingSoon && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] bg-black text-white px-6 py-3 rounded-full shadow-xl" onClick={() => setComingSoon(null)}>
            {comingSoon}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}