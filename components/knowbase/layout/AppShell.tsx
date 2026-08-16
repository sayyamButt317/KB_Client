"use client";
import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { AppHeader } from "./AppHeader";
import { RightSidebar } from "./RightSidebar";
import { StatsGrid } from "@/components/knowbase/stats/StatsGrid";
import { ChatInterface } from "@/components/knowbase/chat/ChatInterface";
import { SessionInfo } from "@/Types/chat.types";

const DEFAULT_SESSION: SessionInfo = {
  sourcesUsed: 0,
  tokensUsed: 0,
  model: "GPT-4o",
  responseTimeSec: null,
  topSources: [],
};

interface AppShellProps {
  loading: boolean;
  jobId: string;
  onUploadFile: () => void;
  onUploadFolder: () => void;
}

export function AppShell({
  loading,
  jobId,
  onUploadFile,
  onUploadFolder,
}: AppShellProps) {
  const [session, setSession] = useState<SessionInfo>(DEFAULT_SESSION);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      <div className="hidden lg:flex">
        <LeftSidebar
          loading={loading}
          jobId={jobId}
          onUploadFile={onUploadFile}
          onUploadFolder={onUploadFolder}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader model={session.model} />

        <div className="flex flex-1 overflow-hidden">
          <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="hidden shrink-0 border-b border-gray-200 bg-[#F9FAFB] px-6 py-4 sm:block">
              <StatsGrid />
            </div>

            <div className="flex flex-1 flex-col overflow-hidden bg-white">
              <ChatInterface
                onSessionUpdate={setSession}
                onUploadFile={onUploadFile}
                onUploadFolder={onUploadFolder}
              />
            </div>
          </main>

          <RightSidebar session={session} />
        </div>
      </div>
    </div>
  );
}
