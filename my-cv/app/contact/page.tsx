"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from "lucide-react";
import { Github, Linkedin, Twitter, ExternalLink, Zap } from "lucide-react";

export default function Contact() {
     const socialLinks = [
    { icon: Github, label: "GitHub", url: "#", color: "hover:text-blue-600" },
    { icon: Linkedin, label: "LinkedIn", url: "#", color: "hover:text-blue-500" },
    { icon: Twitter, label: "Twitter", url: "#", color: "hover:text-sky-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };
  return (
    <section
      id="contact"
      className="relative container mx-auto px-4 py-20 scroll-mt-20"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Badge className="mb-4 px-4 py-2">
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Feel free to contact me for work, collaboration, or just a friendly chat 👋
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mx-auto">
        {/* LEFT: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-xl bg-primary/10">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold">dung.dev@gmail.com</p>
            </div>
          </Card>

          <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-xl bg-primary/10">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-semibold">+84 xxx xxx xxx</p>
            </div>
          </Card>

          <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
            <div className="p-3 rounded-xl bg-primary/10">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">Viet Nam 🇻🇳</p>
            </div>
          </Card>

         
        </motion.div>

        {/* RIGHT: Form + Social */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Form */}
          <Card className="p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Your name" />
                <Input placeholder="Your email" type="email" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Your message..." rows={5} />
              <Button className="w-full gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Social Links */}
           <Card className="p-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            whileHover={{ rotate: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap className="w-5 h-5 text-primary" />
          </motion.div>
          <h3 className="font-semibold text-lg">Connect with me</h3>
        </div>

        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {socialLinks.map(({ icon: Icon, label, url, color }) => (
            <motion.div key={label} variants={itemVariants}>
              <motion.a
                href={url}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative block"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  variant="outline"
                  className="w-full rounded-lg relative flex items-center justify-between gap-2 group-hover:bg-accent transition-colors"
                  asChild
                >
                  <span>
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 transition-colors ${color}`} />
                      <span>{label}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </Button>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Card>
        </motion.div>
      </div>
    </section>
  );
}