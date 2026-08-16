"use client";

import { CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadWidgetProps {
  loading: boolean;
  onUploadFile: () => void;
  onUploadFolder: () => void;
}

export function UploadWidget({
  loading,
  onUploadFile,
  onUploadFolder,
}: UploadWidgetProps) {
  return (
    <div className="mx-4 mt-4">
      <div
        className={cn(
          "rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/80 p-4 text-center transition-colors",
          !loading && "hover:border-[#6366F1]/40 hover:bg-[#EEF2FF]/30"
        )}
      >
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2FF]">
          <CloudUpload className="h-5 w-5 text-[#6366F1]" />
        </div>
        <p className="text-sm font-medium text-gray-800">
          Upload files or folders
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Drop files here or browse
        </p>
        <p className="mt-2 text-[10px] leading-relaxed text-gray-400">
          PDF, DOCX, TXT, CSV, JSON, NDJSON
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-lg bg-[#6366F1] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onUploadFile}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onUploadFolder}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Folder"}
          </button>
        </div>
      </div>
    </div>
  );
}
