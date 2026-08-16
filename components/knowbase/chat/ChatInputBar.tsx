"use client";

import type { KeyboardEvent } from "react";
import { FolderOpen, Mic, Paperclip, Send } from "lucide-react";

interface ChatInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  onUploadFile?: () => void;
  onUploadFolder?: () => void;
}

export function ChatInputBar({
  value,
  onChange,
  onSubmit,
  disabled = false,
  onUploadFile,
  onUploadFolder,
}: ChatInputBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-[#6366F1] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#6366F1]">
        <button
          type="button"
          className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Attach file"
          onClick={onUploadFile}
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Browse folder"
          onClick={onUploadFolder}
        >
          <FolderOpen className="h-4 w-4" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your documents..."
          className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          disabled={disabled}
        />
        <button
          type="button"
          className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Voice input"
        >
          <Mic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!value.trim() || disabled}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6366F1] text-white transition-colors hover:bg-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] text-gray-400">
        AI can make mistakes. Please verify important information.
      </p>
    </div>
  );
}
