"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { ChatMessage, SessionInfo } from "@/Types/chat.types";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatThinkingIndicator } from "./ChatThinkingIndicator";
import { ChatInputBar } from "./ChatInputBar";

interface ChatInterfaceProps {
  onSessionUpdate?: (session: SessionInfo) => void;
  onUploadFile?: () => void;
  onUploadFolder?: () => void;
}

function extractTopSources(messages: ChatMessage[]): SessionInfo["topSources"] {
  const lastAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant" && m.documents?.length);

  if (!lastAssistant?.documents) return [];

  return lastAssistant.documents.slice(0, 3).map((doc, index) => {
    const src = doc.metadata?.source || "Unknown";
    const fileOnly = src.split(/[/\\]/).pop() || src;
    return {
      name: fileOnly,
      confidence: Math.max(93, 98 - index * 2),
    };
  });
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function ChatInterface({
  onSessionUpdate,
  onUploadFile,
  onUploadFolder,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [expandedSources, setExpandedSources] = useState<Set<number>>(
    new Set()
  );
  const [lastResponseTime, setLastResponseTime] = useState<number | null>(null);

  const toggleSources = (index: number) => {
    setExpandedSources((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const updateSession = useCallback(
    (history: ChatMessage[], responseTime: number | null) => {
      const lastAssistant = [...history]
        .reverse()
        .find((m) => m.role === "assistant");

      const totalTokens = history.reduce(
        (acc, m) => acc + estimateTokens(m.content || ""),
        0
      );

      onSessionUpdate?.({
        sourcesUsed: lastAssistant?.documents?.length ?? 0,
        tokensUsed: totalTokens,
        model: "GPT-4o",
        responseTimeSec: responseTime,
        topSources: extractTopSources(history),
      });
    },
    [onSessionUpdate]
  );

  useEffect(() => {
    updateSession(messageHistory, lastResponseTime);
  }, [messageHistory, lastResponseTime, updateSession]);

  const handlechatmessage = async () => {
    if (!message.trim()) return;
    const userMessage = message;
    setMessage("");
    setMessageHistory((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
    ]);
    setIsThinking(true);
    const startTime = performance.now();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat?message=${encodeURIComponent(userMessage)}`
      );

      const data = await res.json();
      const elapsed = (performance.now() - startTime) / 1000;
      setLastResponseTime(elapsed);
      setMessageHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          documents: data.docs,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);
      setIsThinking(false);
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messageHistory.length === 0 && !isThinking && (
          <div className="flex h-full min-h-[200px] items-center justify-center">
            <p className="text-sm text-gray-400">
              Upload a file or folder and start chatting. We&apos;ll highlight
              sources and keep context as you go.
            </p>
          </div>
        )}
        {messageHistory.map((msg, index) => (
          <ChatMessageBubble
            key={index}
            message={msg}
            index={index}
            isExpanded={expandedSources.has(index)}
            onToggleSources={toggleSources}
          />
        ))}
        {isThinking && <ChatThinkingIndicator />}
      </div>

      <ChatInputBar
        value={message}
        onChange={setMessage}
        onSubmit={handlechatmessage}
        disabled={isThinking}
        onUploadFile={onUploadFile}
        onUploadFolder={onUploadFolder}
      />
    </div>
  );
}
