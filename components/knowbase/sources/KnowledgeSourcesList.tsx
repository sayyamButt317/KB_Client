"use client";

import { Folder } from "lucide-react";
import FileWatcherStatus from "@/components/knowbase/file/FileWatcherStatus";

interface KnowledgeSourcesListProps {
  jobId: string;
}

export function KnowledgeSourcesList({ jobId }: KnowledgeSourcesListProps) {
  return (
    <div className="mt-6 flex flex-1 flex-col overflow-hidden px-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Knowledge Sources
        </h3>
      </div>
      <div className="relative mb-3">
        <input
          type="search"
          placeholder="Search sources..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-3 text-xs text-gray-700 placeholder:text-gray-400 focus:border-[#6366F1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
        />
      </div>

      <FileWatcherStatus jobId={jobId} />

      {!jobId && (
        <div className="mt-3 rounded-lg border border-dashed border-gray-200 bg-gray-50/50 p-4 text-center">
          <Folder className="mx-auto mb-2 h-8 w-8 text-gray-300" />
          <p className="text-xs text-gray-500">
            Upload files to build your knowledge base
          </p>
        </div>
      )}

      <button
        type="button"
        className="mt-auto pt-4 text-xs font-medium text-[#6366F1] hover:text-[#4F46E5]"
      >
        View all sources →
      </button>
    </div>
  );
}
