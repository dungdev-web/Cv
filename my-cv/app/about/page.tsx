// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  Sparkles,
  Code2,
  Rocket,
  Target,
  Heart,
  Coffee,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import CertificateModal from "@/components/CertificateModal";
import { useI18n } from "@/lib/i18n";
import { projects } from "../data/projects";
export default function About() {
  const { t, lang } = useI18n();
  const [showCertificates, setShowCertificates] = useState(false);
  const [cv, setCv] = useState("");
  const highlights = [
    { icon: Code2, color: "text-blue-500", key: "cleanCode" as const },
    { icon: Rocket, color: "text-purple-500", key: "fastLearner" as const },
    { icon: Target, color: "text-orange-500", key: "detail" as const },
  ];

  const stats = [
    {
      value: `${projects.length}+`,
      labelKey: "projects" as const,
      icon: Rocket,
    },
    { value: "2", labelKey: "passion" as const, icon: Heart },
    { value: "1+", labelKey: "learning" as const, icon: Coffee },
  ];
  useEffect(() => {
  const loadCV = async () => {
    try {
      const res = await fetch("/api/admin/upload-cv");

      if (!res.ok) return;

      const data = await res.json();

      const activeFile = data.files.find(
        (file: any) => file.pathname === data.active
      );

      if (activeFile) {
        setCv(activeFile.url);
      }
    } catch (err) {
      console.error("Load CV failed", err);
    }
  };

  loadCV();
}, []);
  return (
    <>
      <section
        id="about"
        className="relative container mx-auto py-16 px-4 overflow-hidden min-h-screen flex items-center"
      >
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center w-full">
          {/* LEFT: visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center relative"
          >
            <div className="relative w-full max-w-md aspect-square">
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-4/5 h-4/5 rounded-2xl bg-gradient-to-br from-background to-background/80 border-2 border-primary/20 shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-8 space-y-4">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <motion.div
                          className={`h-3 rounded-full bg-gradient-to-r ${i % 3 === 0 ? "from-blue-500 to-cyan-500 w-1/2" : i % 3 === 1 ? "from-purple-500 to-pink-500 w-2/3" : "from-orange-500 to-yellow-500 w-1/3"}`}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="absolute bottom-20 left-12 w-1 h-6 bg-primary"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-10 bg-secondary/50 backdrop-blur-sm border-b border-border flex items-center gap-2 px-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-muted-foreground font-mono">
                      portfolio.tsx
                    </span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl border-4 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl border-4 border-purple-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-8 left-1/4"
              >
                <Badge className="bg-blue-500/90 text-white shadow-lg">
                  <Code2 className="w-3 h-3 mr-1" />
                  React
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-8 -right-8"
              >
                <Badge className="bg-purple-500/90 text-white shadow-lg">
                  <Zap className="w-3 h-3 mr-1" />
                  Next.js
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-8 right-1/4"
              >
                <Badge className="bg-cyan-500/90 text-white shadow-lg">
                  <Sparkles className="w-3 h-3 mr-1" />
                  TypeScript
                </Badge>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {t.about.badge}
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              {t.about.heading1}{" "}
              <span className="text-primary">{t.about.heading2}</span>{" "}
              {t.about.heading3}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <p className="text-muted-foreground leading-relaxed">
                {lang === "en" ? "I'm " : "Tôi là "}
                <span className="font-semibold text-foreground">
                  Dũng
                </span>, {t.about.desc1}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t.about.desc2}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-3"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-3 text-center hover:shadow-lg transition-all border-2 hover:border-primary/50">
                    <div className="flex"></div>
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.about.stats[stat.labelKey]}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="space-y-2"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer group"
                >
                  <div className="p-2 rounded-lg bg-secondary group-hover:scale-110 transition-transform">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">
                      {t.about.highlights[item.key].title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t.about.highlights[item.key].description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Button className="group">
                <Link href={cv} target="_blank" className="flex items-center">
                  <Download className="mr-2 w-4 h-4 group-hover:animate-bounce" />
                  {t.about.downloadCV}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="group"
                onClick={() => setShowCertificates(true)}
              >
                <Eye className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                {t.about.viewCert}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CertificateModal
        isOpen={showCertificates}
        onClose={() => setShowCertificates(false)}
      />
    </>
  );
}
