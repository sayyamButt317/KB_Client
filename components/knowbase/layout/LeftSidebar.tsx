"use client";

import { BrandLogo } from "@/components/knowbase/brand/BrandLogo";
import { NavMenu } from "@/components/knowbase/navigation/NavMenu";
import { UploadWidget } from "@/components/knowbase/upload/UploadWidget";
import { KnowledgeSourcesList } from "@/components/knowbase/sources/KnowledgeSourcesList";

interface LeftSidebarProps {
  loading: boolean;
  jobId: string;
  onUploadFile: () => void;
  onUploadFolder: () => void;
}

export function LeftSidebar({
  loading,
  jobId,
  onUploadFile,
  onUploadFolder,
}: LeftSidebarProps) {
  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-5">
        <BrandLogo />
      </div>

      <div className="py-4">
        <NavMenu activeItem="chat" />
      </div>

      <UploadWidget
        loading={loading}
        onUploadFile={onUploadFile}
        onUploadFolder={onUploadFolder}
      />

      <KnowledgeSourcesList jobId={jobId} />
    </aside>
  );
}
