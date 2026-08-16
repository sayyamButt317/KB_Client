"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { CheckCircle, XCircle, Loader2, MoreVertical, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { SourceStatus } from "@/Types/knowledge.types";

interface FileWatcherStatusProps {
  jobId: string;
}

export default function FileWatcherStatus({ jobId }: FileWatcherStatusProps) {
  const [status, setStatus] = useState<SourceStatus>("pending");

  useEffect(() => {
    if (!jobId) return;
    setStatus("pending");
    const socket = getSocket();
    const channel = `job:${jobId}`;
    const handler = (data: {
      status: "completed" | "failed";
      error?: string;
    }) => {
      setStatus(data.status === "completed" ? "indexed" : "failed");
      if (data.status === "completed") {
        toast.success("Embedding completed");
      } else if (data.status === "failed") {
        toast.error("Embedding failed");
      }
    };
    socket.on(channel, handler);
    return () => {
      socket.off(channel, handler);
    };
  }, [jobId]);

  if (!jobId) return null;

  const statusConfig = {
    pending: {
      label: "Indexing...",
      icon: Loader2,
      iconClass: "animate-spin text-[#6366F1]",
      badgeClass: "text-[#6366F1] bg-[#EEF2FF]",
    },
    indexing: {
      label: "Indexing...",
      icon: Loader2,
      iconClass: "animate-spin text-[#6366F1]",
      badgeClass: "text-[#6366F1] bg-[#EEF2FF]",
    },
    indexed: {
      label: "Indexed",
      icon: CheckCircle,
      iconClass: "text-emerald-500",
      badgeClass: "text-emerald-700 bg-emerald-50",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      iconClass: "text-red-500",
      badgeClass: "text-red-700 bg-red-50",
    },
  } as const;

  const config = statusConfig[status === "pending" ? "pending" : status];
  const StatusIcon = config.icon;

  return (
    <div className="mx-4 mt-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm lg:mx-0">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF]">
          <FileText className="h-4 w-4 text-[#6366F1]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            Processing upload
          </p>
          <p className="text-xs text-gray-500">Job ID: {jobId.slice(0, 12)}…</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
            config.badgeClass
          )}
        >
          <StatusIcon className={cn("h-3 w-3", config.iconClass)} />
          {config.label}
        </span>
        <button
          type="button"
          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      {status === "indexed" && (
        <p className="mt-2 text-xs text-gray-500">
          You can start querying now.
        </p>
      )}
      {status === "failed" && (
        <p className="mt-2 text-xs text-red-500">Please try again.</p>
      )}
    </div>
  );
}
