"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  demo?: string;
  github?: string;
  features?: string[];
};

const projects: Project[] = [
  {
    id: "todo",
    title: "Todo App",
    description: "Task management app with localStorage and filters.",
    fullDescription: "A comprehensive task management application that helps you organize your daily tasks. Features include creating, editing, deleting tasks with persistent storage using localStorage. Includes filtering by status and due dates.",
    image: "/api/placeholder/400/250",
    tags: ["React", "Tailwind"],
    features: ["Add/Edit/Delete tasks", "Filter by status", "Local storage persistence", "Responsive design"],
    demo: "#",
    github: "#",
  },
  {
    id: "auth-ui",
    title: "Authentication UI",
    description: "Login / Register UI with validation and Material UI.",
    fullDescription: "Beautiful and functional authentication interface with form validation. Supports both login and registration flows with real-time validation feedback, password strength indicator, and error handling.",
    image: "/api/placeholder/400/250",
    tags: ["React", "MUI"],
    features: ["Form validation", "Password strength meter", "Email verification", "Error handling"],
    demo: "#",
    github: "#",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description: "My portfolio built with Next.js, Tailwind and Framer Motion.",
    fullDescription: "A modern, interactive portfolio website showcasing my work and skills. Built with cutting-edge technologies, featuring smooth animations, dark mode support, and optimized performance.",
    image: "/api/placeholder/400/250",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    features: ["Smooth animations", "Dark mode", "SEO optimized", "Mobile responsive"],
    demo: "#",
    github: "#",
  },
  {
    id: "quiz",
    title: "Quiz Game",
    description: "Quiz app with timer, score, streak and categories.",
    fullDescription: "An engaging quiz game with multiple categories, real-time scoring, and competitive gameplay. Features include timed questions, streak tracking, and detailed results analysis.",
    image: "/api/placeholder/400/250",
    tags: ["JavaScript", "HTML", "CSS"],
    features: ["Multiple categories", "Timer system", "Streak tracking", "Score analysis"],
    demo: "#",
    github: "#",
  },
];

const allTags = ["All", ...Array.from(new Set(projects.flatMap(p => p.tags)))];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20 },
} as const;

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter(p => p.tags.includes(activeTag));

  return (
    <section
      id="projects"
      className="container mx-auto px-4 py-24 scroll-mt-20"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-blue-600">Projects</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here are some projects I built while learning and practicing frontend
          development.
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {allTags.map(tag => (
          <Button
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTag(tag)}
            className="rounded-full"
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filtered.map(project => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden group h-full flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                {/* Image */}
                <div 
                  className="relative overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                      Xem chi tiết
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {project.demo && (
                      <Button 
                        size="sm" 
                        className="gap-2 flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </Button>
                    )}
                    {project.github && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2 flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Title & Tags */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-4">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        className="rounded-full bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Mô tả</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Features */}
                {selectedProject.features && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Tính năng chính</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  {selectedProject.demo && (
                    <Button 
                      size="lg" 
                      className="gap-2 flex-1"
                      asChild
                    >
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5" />
                        Xem demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.github && (
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-2 flex-1"
                      asChild
                    >
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" />
                        Xem code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}