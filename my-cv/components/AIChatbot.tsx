"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Components } from "react-markdown";
import React from "react";
import { useChat } from "@/app/hooks/useChat";

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-violet-400">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-0.5 my-1">{children}</ul>
  ),
  li: ({ children }) => <li className="text-sm">{children}</li>,
  code: ({ children }) => (
    <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-violet-300">
      {children}
    </code>
  ),
  h3: ({ children }) => (
    <h3 className="font-semibold text-sm mt-2 mb-1">{children}</h3>
  ),
  a: ({ href, children }) =>
    React.createElement(
      "a",
      {
        href: href ?? "#",
        target: "_blank",
        rel: "noopener noreferrer",
        className:
          "text-violet-400 underline hover:text-violet-300 transition-colors break-all",
      },
      children
    ),
};

const renderMarkdown = (content: string) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
    {content}
  </ReactMarkdown>
);

const SUGGESTED_QUESTIONS = [
  "Dũng có biết Redis không?",
  "Kinh nghiệm React của Dũng?",
  "Dũng đã làm những project nào?",
  "Dũng phù hợp vị trí nào?",
];

export default function AIChatbot() {
  const [input, setInput] = useState("");
  const { messages, isStreaming, error, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Tin nhắn chào mặc định — chỉ hiện khi chưa có message nào từ hook
  const displayMessages =
    messages.length === 0
      ? [
          {
            role: "assistant" as const,
            content:
              "Xin chào! Tôi là AI assistant của Dũng. Bạn có thể hỏi tôi về kỹ năng, kinh nghiệm, hay dự án của Dũng nhé 👋",
          },
        ]
      : messages;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const q = text ?? input.trim();
    if (!q || isStreaming) return;

    setInput("");
    await sendMessage(q);
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-sm font-medium">
          D
        </div>
        <div>
          <p className="text-sm font-medium">Hỏi về Dũng</p>
          <p className="text-xs text-muted-foreground">
            Powered by Groq · Llama 3.3
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Online
        </span>
      </div>

      {/* Error banner */}
      {error && (
        <div className="text-red-400 text-xs px-3 py-2 mb-2 rounded-lg bg-red-500/10 border border-red-500/20">
          {error}
        </div>
      )}

      {/* Messages */}
      <div className="overflow-y-auto flex flex-col gap-3 mb-3">
        <AnimatePresence initial={false}>
          {displayMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-violet-600 rounded-br-sm"
                    : "text-foreground rounded-bl-sm"
                }`}
              >
                {msg.role === "assistant"
                  ? renderMarkdown(msg.content)
                  : msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator — chỉ hiện khi đang stream mà message cuối chưa có nội dung */}
        {isStreaming &&
          messages[messages.length - 1]?.content === "" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested questions — chỉ hiện lúc đầu */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-xs px-3 py-1.5 rounded-full border hover:bg-white/10 transition-colors hover:text-white/70"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 border-t pt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Hỏi về Dũng..."
          className="flex-1 border rounded-xl px-4 py-2 text-sm outline-none focus:border-violet-500 transition-colors"
          disabled={isStreaming}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || isStreaming}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-medium transition-colors"
        >
          {isStreaming ? "..." : "Gửi"}
        </button>
      </div>
    </div>
  );
}