// ============================================================
// hooks/useChat.ts
// Hook consume SSE stream từ /api/chat
// Thay thế fetch() cũ — hỗ trợ streaming + rate limit error
// ============================================================

import { useState, useCallback, useRef } from "react";

export type Intent =
  | "project_inquiry"
  | "skill_inquiry"
  | "contact_inquiry"
  | "hiring_inquiry"
  | "web_search_needed"
  | "general";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseChatReturn {
  messages: Message[];
  isStreaming: boolean;
  intent: Intent | null;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      setError(null);

      const userMsg: Message = { role: "user", content: text };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);

      // Placeholder cho assistant reply (streaming)
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsStreaming(true);

      // Hủy stream cũ nếu có
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages,
            stream: true,
          }),
          signal: abortRef.current.signal,
        });

        // Rate limit
        if (res.status === 429) {
          const retryAfter = res.headers.get("Retry-After") ?? "60";
          setError(`Bạn nhắn quá nhanh. Thử lại sau ${retryAfter}s.`);
          setMessages((prev) => prev.slice(0, -1)); // xoá placeholder
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        // SSE reader
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No stream body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const payload = JSON.parse(line.slice(6));

              if (payload.type === "meta") {
                setIntent(payload.intent);
              } else if (payload.type === "text") {
                // Append delta vào tin nhắn cuối
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last?.role === "assistant") {
                    updated[updated.length - 1] = {
                      ...last,
                      content: last.content + payload.content,
                    };
                  }
                  return updated;
                });
              } else if (payload.type === "done") {
                break;
              } else if (payload.type === "error") {
                setError(payload.message ?? "Lỗi không xác định");
              }
            } catch {
              // ignore malformed JSON
            }
          }
        }
      } catch (err: any) {
        if (err.name === "AbortError") return; // user cancelled
        console.error("Chat error:", err);
        setError("Không thể kết nối. Thử lại nhé!");
        setMessages((prev) => prev.slice(0, -1)); // xoá placeholder rỗng
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming]
  );

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIntent(null);
    setError(null);
  }, []);

  return { messages, isStreaming, intent, error, sendMessage, clearMessages };
}