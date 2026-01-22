"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Layers, Palette, Zap, Wrench, TrendingUp, Database, Smartphone } from "lucide-react";

const skills = [
  { name: "HTML / CSS", level: 85, icon: Code2, color: "from-orange-500 to-red-500" },
  { name: "JavaScript", level: 80, icon: Zap, color: "from-yellow-500 to-orange-500" },
  { name: "TypeScript", level: 70, icon: Code2, color: "from-blue-500 to-cyan-500" },
  { name: "React", level: 75, icon: Layers, color: "from-cyan-500 to-blue-500" },
  { name: "Next.js", level: 65, icon: Layers, color: "from-gray-700 to-gray-900" },
  { name: "Tailwind CSS", level: 80, icon: Palette, color: "from-teal-500 to-cyan-500" },
];

const tools = [
  { name: "VS Code", icon: Code2 },
  { name: "Git / GitHub", icon: Code2 },
  { name: "Figma", icon: Palette },
  { name: "Postman", icon: Zap },
  { name: "Vercel", icon: TrendingUp },
  { name: "Firebase", icon: Zap },
];

const expertise = [
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    description: "Always exploring new technologies and best practices to stay current with modern web development."
  },
  {
    icon: Code2,
    title: "Clean Code Focus",
    description: "Writing maintainable, well-documented code that's easy to understand and scale."
  },
  {
    icon: Palette,
    title: "UI/UX Mindset",
    description: "Attention to detail in design implementation and user experience optimization."
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Creating beautiful, functional interfaces that work seamlessly across all devices."
  },
  {
    icon: Database,
    title: "Performance Optimization",
    description: "Optimizing load times and ensuring smooth user experiences with efficient code."
  },
  {
    icon: Zap,
    title: "Problem Solving",
    description: "Tackling complex challenges with creative and efficient solutions that scale."
  },
  {
    icon: Wrench,
    title: "Debugging Skills",
    description: "Quickly identifying and fixing bugs using modern development tools and techniques."
  },
  {
    icon: TrendingUp,
    title: "Collaboration",
    description: "Working effectively with teams and communicating technical concepts clearly."
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative container mx-auto px-4 py-20 scroll-mt-20 overflow-hidden"
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
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
          Technical Skills
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-primary">Skills</span> & Expertise
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Technologies and tools I'm using and improving every day to build amazing products.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* LEFT: Skill bars */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              Core Technologies
            </h3>
          </motion.div>

          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 8 }}
              className="group"
            >
              <Card className="p-5 hover:shadow-xl transition-all border-2 hover:border-primary/30">
                <div className="flex items-center justify-between mb-2.25">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary group-hover:scale-110 transition-transform">
                      <skill.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-lg">{skill.name}</span>
                  </div>
                  <motion.span 
                    className="text-sm font-bold text-primary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>

                <div className="h-3 w-full rounded-full bg-secondary overflow-hidden relative">
                  {/* Background shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.2
                    }}
                  />
                  
                  <motion.div
                    className={`h-full rounded-full bg-linear-to-r ${skill.color} relative`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 blur-sm opacity-50"
                      style={{ background: "inherit" }}
                    />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: Tools & Expertise */}
        <div className="space-y-6">
          {/* Tools Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-2 hover:border-primary/30 transition-all relative overflow-hidden group">
              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Wrench className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Tools & Workflow</h3>
                </div>

                <div className="flex flex-wrap gap-3">
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
                        className="px-4 py-2.5 text-sm font-medium hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        <tool.icon className="w-3.5 h-3.5 mr-2" />
                        {tool.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Expertise Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="p-5 h-full border-2 hover:border-primary/30 transition-all group hover:shadow-lg relative overflow-hidden">
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  <div className="relative z-10">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mb-3 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}