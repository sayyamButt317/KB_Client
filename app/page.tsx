"use client";

import { AppShell } from "@/components/knowbase/layout/AppShell";
import { useFileUpload } from "@/hooks/useFileUpload";

export default function ChatPage() {
  const { loading, jobId, uploadFile, uploadFolder } = useFileUpload();

  return (
    <AppShell
      loading={loading}
      jobId={jobId}
      onUploadFile={uploadFile}
      onUploadFolder={uploadFolder}
    />
  );
}
