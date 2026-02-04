"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
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
    fullDescription:
      "A comprehensive task management application that helps you organize your daily tasks. Features include creating, editing, deleting tasks with persistent storage using localStorage. Includes filtering by status and due dates.",
    image: "/todo.png",
    tags: ["React", "Tailwind", "Node.js", "MUI", "Framer Motion"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    demo: "https://quan-ly-thoi-gian.vercel.app/",
    github: "https://github.com/dungdev-web/quan_ly_thoi_gian",
  },
  {
    id: "auth-ui",
    title: "Authentication UI",
    description: "Login / Register UI with validation and Material UI.",
    fullDescription:
      "Beautiful and functional authentication interface with form validation. Supports both login and registration flows with real-time validation feedback, password strength indicator, and error handling.",
    image: "/login.png",
    tags: ["React", "MUI"],
    features: [
      "Form validation",
      "Password strength meter",
      "Email verification",
      "Error handling",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/Login_MUI",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description: "My portfolio built with Next.js, Tailwind and Framer Motion.",
    fullDescription:
      "A modern, interactive portfolio website showcasing my work and skills. Built with cutting-edge technologies, featuring smooth animations, dark mode support, and optimized performance.",
    image: "/porfordio.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "React", "Firebase"],
    features: [
      "Smooth animations",
      "Dark mode",
      "SEO optimized",
      "Mobile responsive",
    ],
    demo: "https://cv-five-beige.vercel.app/",
    github: "https://github.com/dungdev-web/Cv",
  },
  {
    id: "quiz",
    title: "Quiz Game",
    description: "Quiz app with timer, score, streak and categories.",
    fullDescription:
      "An engaging quiz game with multiple categories, real-time scoring, and competitive gameplay. Features include timed questions, streak tracking, and detailed results analysis.",
    image: "/my-quizz.png",
    tags: ["JavaScript", "HTML", "CSS", "Tailwind"],
    features: [
      "Multiple categories",
      "Timer system",
      "Streak tracking",
      "Score analysis",
    ],
    demo: "https://my-quizz-inky.vercel.app/",
    github: "https://github.com/dungdev-web/my_quizz",
  },
  {
    id: "weather",
    title: "Weather App",
    description: "Task management app with localStorage and filters.",
    fullDescription:
      "The Weather App is a web application that uses an API to display weather information for the city the user searches for. The app provides basic information such as temperature, humidity, weather conditions, and daily forecasts. The interface is designed to be responsive and easy to use on various devices. This project helps develop skills in working with APIs, handling asynchronous data, and building user interfaces.",
    image: "/weather.png",
    tags: ["React", "Tailwind", "API"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    demo: "https://weather-ten-livid.vercel.app/",
    github: "#",
  },
  {
    id: "budget",
    title: "Budget App",
    description:
      "Personal expense management app with statistical charts and income/expense categorization.",
    fullDescription:
      "The Personal Budget App is a web application that helps users track and manage their daily income and expenses. The app supports income and expense categorization and is currently developing visual statistical charts by time period and category. Data is stored in Firebase for long-term use, and the interface is designed to be responsive and compatible with various devices. This project helps develop data processing skills, visualization through charts, and the creation of a basic personal finance management application.",
    image: "/budget.png",
    tags: ["React", "Firebase"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    demo: "https://budget-ivory-seven.vercel.app/",
    github: "https://github.com/dungdev-web/budget",
  },
  {
    id: "personal-blog",
    title: "Personal Blog",
    description:
      "Personal expense management app with statistical charts and income/expense categorization.",
    fullDescription:
      "Personal Blog is a website that shares programming knowledge, supports writing articles using Markdown, categorizes articles by topic, and allows content searching. The website has a responsive interface and displays well on various devices. This project helps develop skills in building content systems, processing article data, and developing a complete blog website.",
    image: "/blog.png",
    tags: ["React", "Firebase", "Markdown"],
    features: [
      "Add/Edit/Delete tasks",
      "Filter by status",
      "Local storage persistence",
      "Responsive design",
    ],
    demo: "https://personal-blog-silk-ten.vercel.app/",
    github: "https://github.com/dungdev-web/personal_blog",
  },
  {
    id: "ecommerce-shoes",
    title: "Ecommerce Shoes",
    description:
      "Modern e-commerce website for selling shoes with product filtering, cart, and checkout.",
    fullDescription:
      "Ecommerce Shoes is a modern online shopping website specialized in selling shoes. The application allows users to browse products, filter by categories, view product details, add items to cart, and proceed to checkout. The project focuses on building a clean UI, smooth user experience, and reusable components. It also helps practice state management, product listing, and basic e-commerce flows.",
    image: "/nodejs.png",
    tags: ["React", "Tailwind", "MongoDB", "HTML", "Node.js"],
    features: [
      "Product listing and product details page",
      "Filter by category, price, and brand",
      "Add to cart and remove from cart",
      "Checkout flow and order summary",
      "Responsive design for all devices",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/NodeJs",
  },
  {
    id: "ecommerce-hamburger",
    title: "Ecommerce Hamburger",
    description:
      "Modern e-commerce website for ordering hamburgers with menu, cart, and checkout system.",
    fullDescription:
      "Ecommerce Hamburger is a modern online food ordering website specialized in selling hamburgers and fast food. The application allows users to browse the menu, view food details, add items to the cart, and place orders. The project focuses on building a clean UI, smooth user experience, and a full-stack flow using Node.js and MongoDB. It also helps practice CRUD operations, API development, and basic e-commerce ordering flows.",
    image: "/hamburger.png",
    tags: ["React", "Tailwind", "MySQL", "Node.js"],
    features: [
      "Menu listing and food detail page",
      "Add to cart and remove items from cart",
      "Place order and order summary",
      "Backend API with Node.js & MongoDB",
      "Responsive design for all devices",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/react_web",
  },
  {
    id: "flash-card",
    title: "Flash Card English",
    description:
      "English learning app using flashcards to practice vocabulary and improve memory.",
    fullDescription:
      "Flash Card English is a web application designed to help users learn and memorize English vocabulary through flashcards. The app allows users to create, view, edit, and delete flashcards, practice words with flip animations, and track their learning progress. The project focuses on building an intuitive UI, smooth interactions, and a simple backend using Node.js and MySQL for data storage. This project helps practice CRUD operations, basic database design, and full-stack development skills.",
    image: "/english.png",
    tags: ["React", "Tailwind", "Firebase", "Next.js"],
    features: [
      "Create flashcards",
      "Flip card animation to show meaning",
      "Vocabulary practice and review",
      "Backend API with Next.js & Firebase",
      "Responsive design for all devices",
    ],
    demo: "https://flash-card-pink-five.vercel.app/login",
    github: "https://github.com/dungdev-web/flash-card",
  },
  {
    id: "chat-realtime",
    title: "Chat Realtime",
    description:
      "Realtime chat application with authentication, online status, and instant messaging.",
    fullDescription:
      "Chat Realtime is a real-time messaging web application that allows users to communicate instantly with each other. The app supports user authentication, sending and receiving messages in real time, and displaying online/offline status. Built with Next.js, React, Tailwind CSS, and Firebase, the project focuses on real-time data handling, modern UI design, and scalable frontend architecture. This project helps practice working with real-time databases, authentication flows, and responsive UI development.",
    image: "/chat.png",
    tags: ["React", "Tailwind", "Firebase", "Socket.io"],
    features: [
      "User authentication (login / register)",
      "Realtime messaging with Firebase",
      "Online and offline user status",
      "Modern chat UI with responsive design",
      "Deployed on Vercel",
    ],
    demo: "https://chat-social-self.vercel.app/",
    github: "https://github.com/dungdev-web/chat_social",
  },
  {
    id: "short-link",
    title: "Short Link Generator",
    description:
      "URL shortener application with link management, analytics, and rate limiting.",
    fullDescription:
      "Short Link Generator is a web application that allows users to convert long URLs into short, shareable links. The system supports creating, managing, and redirecting short links with high performance and security. It also includes rate limiting to prevent abuse and ensures stable operation. Built with Next.js, React, Tailwind CSS, Node.js, and PostgreSQL, this project focuses on backend API design, database modeling, and building a scalable full-stack application.",
    image: "/short-link.png",
    tags: [
      "React",
      "Next.js",
      "Tailwind",
      "Node.js",
      "PostgreSQL",
      "Rate Limiting",
    ],
    features: [
      "Generate short links from long URLs",
      "Fast redirect with backend API",
      "Rate limiting to prevent spam and abuse",
      "PostgreSQL database for link storage",
      "Responsive UI and modern design",
    ],
    demo: "#",
    github: "https://github.com/dungdev-web/short_link",
  },
];

const allTags = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];

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
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

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
          My <span>Projects</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here are some projects I built while learning and practicing frontend
          development.
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {allTags.map((tag) => (
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
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                data-cursor-stick
                data-cursor-text="OPEN"
                className="overflow-hidden group h-full flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
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
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full"
                      >
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

                          if (project.demo === "#" || !project.demo) {
                            setComingSoon("Demo đang được phát triển 🚧");
                            return;
                          }

                          window.open(project.demo, "_blank");
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </Button>
                    )}
                    {project.github && (
                      <MagneticButton>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.github === "#") {
                              setComingSoon("Code đang được cập nhật 🚧");
                            } else {
                              window.open(project.github, "_blank");
                            }
                          }}
                          data-cursor-stick
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </Button>
                      </MagneticButton>
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
              className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                  className="absolute top-4 right-4  hover:bg-white rounded-full p-2 transition-all duration-200 hover:scale-110"
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
                    {selectedProject.tags.map((tag) => (
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
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Features */}
                {selectedProject.features && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Main Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-muted-foreground"
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
                      onClick={() => {
                        if (selectedProject.demo === "#") {
                          setComingSoon("Demo đang được phát triển 🚧");
                        } else {
                          window.open(selectedProject.demo, "_blank");
                        }
                      }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Xem demo
                    </Button>
                  )}
                  {selectedProject.github && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 flex-1"
                      asChild
                    >
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
      <AnimatePresence>
        {comingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-999 bg-black text-white px-6 py-3 rounded-full shadow-xl"
            onClick={() => setComingSoon(null)}
          >
            {comingSoon}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
