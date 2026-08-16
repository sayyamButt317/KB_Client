import { Check, Sparkles } from "lucide-react";

const STEPS = [
  { id: "retrieving", label: "Retrieving" },
  { id: "ranking", label: "Ranking" },
  { id: "context", label: "Building context" },
] as const;

export function ChatThinkingIndicator() {
  return (
    <div className="mb-6 flex justify-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]">
        <Sparkles className="h-4 w-4 text-[#6366F1]" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm font-medium text-gray-700">
          Searching knowledge base...
        </p>
        <ul className="mt-3 space-y-2">
          {STEPS.map((step) => (
            <li
              key={step.id}
              className="flex items-center gap-2 text-xs text-gray-600"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50">
                <Check className="h-2.5 w-2.5 text-emerald-500" />
              </span>
              {step.label}
            </li>
          ))}
        </ul>
        <div className="mt-3 inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6366F1] [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6366F1] [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6366F1]" />
        </div>
      </div>
    </div>
  );
}
