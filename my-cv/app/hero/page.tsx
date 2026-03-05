// app/hero/page.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../data/projects";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  const socialLinks = [
    { icon: Github,   href: "https://github.com/dungdev-web/",                              label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dev-d%C5%A9ng-15b3143a2/",         label: "LinkedIn" },
    { icon: Mail,     href: "mailto:dung.dev.web@gmail.com",                                 label: "Email" },
  ];

  const skills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "MUI"];

  return (
    <section id="hero" className="relative container mx-auto min-h-[90vh] flex items-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative">
        {/* LEFT */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="w-fit px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              {t.hero.badge}
            </Badge>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {t.hero.greeting}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Dũng</span>
                <motion.span
                  className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h1>
            <motion.div className="flex items-center gap-3 text-2xl md:text-3xl text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Code2 className="w-8 h-8 text-primary" />
              <span className="font-semibold">{t.hero.role}</span>
            </motion.div>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
            {t.hero.description}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.div key={skill} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.1 }}>
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">{skill}</Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="group">
              <Link href="#projects">{t.hero.viewProjects}</Link>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              <a href="mailto:dung.dev.web@gmail.com">{t.hero.contactMe}</a>
              <Mail className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex gap-4 pt-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end relative"
        >
          <motion.div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-primary/20 rounded-2xl -z-10" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-purple-500/20 rounded-2xl -z-10" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />

          <Card className="relative p-2 rounded-3xl shadow-2xl border-2 overflow-hidden group">
            <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10">
              <motion.div className="w-full h-full flex items-center justify-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image src="/avatar.jpg" alt="Dung avatar" fill className="object-cover" priority />
              </motion.div>
            </div>
            <motion.div
              className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-semibold">{t.hero.openToWork}</span>
            </motion.div>
          </Card>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="absolute -left-8 top-1/4 hidden lg:block">
            <Card className="p-4 shadow-xl backdrop-blur-sm bg-background/95">
              <div className="text-2xl font-bold text-primary">7+</div>
              <div className="text-sm text-muted-foreground">{t.hero.monthsExp}</div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }} className="absolute -right-8 bottom-1/4 hidden lg:block">
            <Card className="p-4 shadow-xl backdrop-blur-sm bg-background/95">
              <div className="text-2xl font-bold text-primary">{projects.length}+</div>
              <div className="text-sm text-muted-foreground">{t.hero.projects}</div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}