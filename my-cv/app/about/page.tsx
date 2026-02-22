"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  Zap} from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";
import CertificateModal from "@/components/CertificateModal";
const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Write code that is easy to read and maintain.",
    color: "text-blue-500",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    description: "Always learning new technologies.",
    color: "text-purple-500",
  },
  {
    icon: Target,
    title: "Detail-oriented",
    description: "Attention to every detail in UI/UX",
    color: "text-orange-500",
  },
];

const stats = [
  { value: "12+", label: "Projects", icon: Rocket },
  { value: "100%", label: "Passion", icon: Heart },
  { value: "24/7", label: "Learning", icon: Coffee },
];





export default function About() {
  const [showCertificates, setShowCertificates] = useState(false);

  return (
    <>
      <section
        id="about"
        className="relative container mx-auto py-16 px-4 overflow-hidden min-h-screen flex items-center"
      >
        {/* Background decorations */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center w-full">
          {/* LEFT: Creative visual element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center relative"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Main decorative card */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating code snippets effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-4/5 h-4/5 rounded-2xl bg-linear-to-br from-background to-background/80 border-2 border-primary/20 shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Code lines animation */}
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
                          className={`h-3 rounded-full bg-linear-to-r ${
                            i % 3 === 0
                              ? "from-blue-500 to-cyan-500 w-1/2"
                              : i % 3 === 1
                                ? "from-purple-500 to-pink-500 w-2/3"
                                : "from-orange-500 to-yellow-500 w-1/3"
                          }`}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
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

                  {/* Glowing cursor effect */}
                  <motion.div
                    className="absolute bottom-20 left-12 w-1 h-6 bg-primary"
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Terminal header */}
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

              {/* Floating decorative elements */}
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

              {/* Tech stack badges floating */}
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

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="px-4 py-2 ">
                <Sparkles className="w-4 h-4 mr-2" />
                About Me
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              Fresher Frontend Developer{" "}
              <span className="text-primary">passionate about</span> creating
              amazing experiences 🚀
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <p className="text-muted-foreground leading-relaxed">
                I'm <span className="font-semibold text-foreground">Dũng</span>,
                a fresher frontend developer is currently learning and
                developing skills in building modern web interfaces with React,
                Next.js, and Tailwind CSS.
              </p>

              <p className="text-muted-foreground leading-relaxed text-sm">
                My goal is to become a professional Frontend Developer,
                contributing real value to products and participating in
                real-world projects in a business environment.
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
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-3 text-center hover:shadow-lg transition-all border-2 hover:border-primary/50">
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
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
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer group"
                >
                  <div
                    className={`p-2 rounded-lg bg-secondary group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
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
                <Link
                  href="/pdf/LuuDucDung_InternFresher_Frontend.pdf"
                  target="_blank"
                  className="flex items-center"
                >
                  <Download className="mr-2 w-4 h-4 group-hover:animate-bounce" />
                  Download CV
                </Link>
              </Button>

              <Button
                variant="outline"
                className="group"
                onClick={() => setShowCertificates(true)}
              >
                <Eye className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                View certificate
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