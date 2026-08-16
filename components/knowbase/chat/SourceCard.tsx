import { ArrowRight } from "lucide-react";
import type { DocumentSource } from "@/Types/chat.types";

interface SourceCardProps {
  doc: DocumentSource;
  referenceText?: string;
}

export function SourceCard({ doc, referenceText }: SourceCardProps) {
  const src = doc.metadata?.source || "Unknown";
  const fileOnly = src.split(/[/\\]/).pop() || src;
  const pageNum = doc.metadata?.loc?.pageNumber;
  const excerpt = (doc.pageContent || "").slice(0, 200);

  return (
    <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50/80 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900">{fileOnly}</p>
          {typeof pageNum === "number" && (
            <p className="text-xs text-gray-500">Page {pageNum}</p>
          )}
        </div>
        <span className="shrink-0 rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[10px] font-semibold text-[#6366F1]">
          98% Confidence
        </span>
      </div>
      {referenceText && (
        <p className="mt-2 text-xs text-gray-600 line-clamp-3">
          {referenceText}
        </p>
      )}
      {excerpt && !referenceText && (
        <p className="mt-2 text-xs text-gray-600 line-clamp-3">
          {excerpt}
          {doc.pageContent && doc.pageContent.length > 200 ? "…" : ""}
        </p>
      )}
      <button
        type="button"
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#6366F1] hover:text-[#4F46E5]"
      >
        View source
        <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
}
