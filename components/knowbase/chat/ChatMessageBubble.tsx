import { Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import type { ChatMessage } from "@/Types/chat.types";
import { SourceCard } from "./SourceCard";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  index: number;
  isExpanded: boolean;
  onToggleSources: (index: number) => void;
}

function formatTime(date?: string): string {
  if (date) return date;
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function stripReferenceText(content: string): string {
  return content.replace(/\s*Reference Text:[\s\S]*$/, "").trim();
}

export function ChatMessageBubble({
  message,
  index,
  isExpanded,
  onToggleSources,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const displayContent = stripReferenceText(message.content || "");
  const referenceText = message.content?.includes("Reference Text:")
    ? (message.content.split("Reference Text:").pop() || "").trim()
    : undefined;

  if (isUser) {
    return (
      <div className="mb-6 flex justify-end gap-3">
        <div className="max-w-[75%]">
          <div className="rounded-2xl rounded-tr-sm bg-[#EEF2FF] px-4 py-3 text-sm text-gray-900">
            {displayContent}
          </div>
          <p className="mt-1 text-right text-[10px] text-gray-400">
            {formatTime(message.timestamp)}
          </p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6366F1] text-xs font-semibold text-white">
          AM
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex justify-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]">
        <Sparkles className="h-4 w-4 text-[#6366F1]" />
      </div>
      <div className="max-w-[85%]">
        <div className="rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed text-gray-800">
            {displayContent}
          </p>

          {message.documents && message.documents.length > 0 && (
            <div className="mt-3 border-t border-gray-100 pt-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Sources
              </p>
              <button
                type="button"
                className="text-xs font-medium text-[#6366F1] hover:text-[#4F46E5]"
                onClick={() => onToggleSources(index)}
              >
                {isExpanded ? "Hide sources" : "View sources"}
              </button>
              {isExpanded && (
                <div className="mt-2 space-y-2">
                  {referenceText && (
                    <div className="rounded-lg border border-gray-200 bg-gray-50/80 p-3">
                      <p className="text-xs font-medium text-gray-700">
                        Reference Text
                      </p>
                      <p className="mt-1 text-xs text-gray-600">{referenceText}</p>
                    </div>
                  )}
                  {message.documents.slice(0, 3).map((doc, i) => (
                    <SourceCard key={i} doc={doc} />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-2">
            <button
              type="button"
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Helpful"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Not helpful"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <p className="mt-1 text-[10px] text-gray-400">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
