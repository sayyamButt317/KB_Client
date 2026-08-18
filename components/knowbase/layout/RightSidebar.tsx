"use client";

import { ChevronDown, FileText } from "lucide-react";
import type { SessionInfo } from "@/Types/chat.types";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  session: SessionInfo;
}

export function RightSidebar({ session }: RightSidebarProps) {
  return (
    <aside className="hidden w-[280px] shrink-0 flex-col border-l border-gray-200 bg-white xl:flex">
      <div className="border-b border-gray-100 p-4">
        <button
          type="button"
          className="flex w-full items-center justify-between text-sm font-semibold text-gray-900"
        >
          Session Details
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
        <dl className="mt-3 space-y-2 text-xs">
          <div className="flex justify-between">
            <dt className="text-gray-500">Sources used</dt>
            <dd className="font-medium text-gray-900">{session.sourcesUsed}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Tokens used</dt>
            <dd className="font-medium text-gray-900">
              {session.tokensUsed.toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Model</dt>
            <dd className="font-medium text-gray-900">{session.model}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Response time</dt>
            <dd className="font-medium text-gray-900">
              {session.responseTimeSec !== null
                ? `${session.responseTimeSec.toFixed(1)} sec`
                : "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-b border-gray-100 p-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Top Sources in this Session
        </h3>
        {(session.topSources ?? []).length > 0 ? (
          <ul className="mt-3 space-y-2">
            {(session.topSources ?? []).map((source, index) => (
              <li
                key={`${source.name}-${index}`}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <FileText className="h-3.5 w-3.5 shrink-0 text-[#6366F1]" />
                  <span className="truncate text-xs text-gray-700">
                    {source.name}
                  </span>
                </div>
                <span className="shrink-0 rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[10px] font-medium text-[#6366F1]">
                  {source.confidence}%
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-xs text-gray-500">
            Sources will appear after you ask a question.
          </p>
        )}
        <button
          type="button"
          className="mt-3 text-xs font-medium text-[#6366F1] hover:text-[#4F46E5]"
        >
          View all sources →
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Recent Activity
        </h3>
        <p className="mt-3 text-xs text-gray-500">
          Upload activity will appear here.
        </p>
        <button
          type="button"
          className={cn(
            "mt-3 text-xs font-medium text-[#6366F1] hover:text-[#4F46E5]"
          )}
        >
          View all activity →
        </button>
      </div>
    </aside>
  );
}
