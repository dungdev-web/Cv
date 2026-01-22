"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Facebook, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialIcons = [
    { Icon: Github, label: "GitHub" },
    { Icon: Facebook, label: "Facebook" },
    { Icon: Mail, label: "Email" },
  ];

  const navItems = ["hero", "about", "skills", "projects", "contact"];

  return (
    <footer className="relative border-t bg-background/80 backdrop-blur">
      <div className="container mx-auto px-6 py-16">
        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <motion.h3
              className="text-2xl font-bold mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Dũng.dev
            </motion.h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Frontend Developer crafting modern, fast & beautiful web
              experiences.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground/80">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {navItems.map((id) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-sm text-muted-foreground inline-block text-left"
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground/80">
              Connect
            </h4>
            <div className="flex gap-2">
              {socialIcons.map(({ Icon, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-lg hover:bg-accent"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground/80">
              Work Together
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Have a project in mind? Let's collaborate.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full rounded-lg hover:bg-accent transition-colors"
              asChild
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Get in Touch
              </motion.button>
            </Button>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-border mb-8 origin-left"
        />

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6"
        >
          <p className="text-xs text-muted-foreground">
            © {year} <span className="font-semibold">Dũng.dev</span>. All rights
            reserved.
          </p>

          <motion.button
  whileHover={{ y: -2 }}
  whileTap={{ y: 0 }}
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="
    cursor-pointer relative
    after:content-['Scroll_to_top']
    after:absolute after:whitespace-nowrap
    after:scale-0 hover:after:scale-100 after:duration-200
    after:text-sm after:font-medium
    after:text-foreground

    w-16 h-16 rounded-full
    border-2 border-border
    bg-background text-foreground

    flex items-center justify-center
    duration-300
    hover:rounded-[50px] hover:w-36
    group/button overflow-hidden
    active:scale-90
    shadow-md hover:shadow-lg
  "
>
  <svg
    className="
      w-3 fill-current
      text-foreground
      delay-50 duration-200
      group-hover/button:-translate-y-12
    "
    viewBox="0 0 384 512"
  >
    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
  </svg>
</motion.button>

        </motion.div>
      </div>
    </footer>
  );
}
