"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

const FILE_ACCEPT =
  "application/pdf,application/json,application/x-ndjson,text/plain,text/csv,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

interface UseFileUploadReturn {
  loading: boolean;
  jobId: string;
  uploadFile: () => void;
  uploadFolder: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState("");

  const uploadFile = useCallback(() => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", FILE_ACCEPT);
    el.addEventListener("change", async () => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/file`, {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
              throw new Error("Upload failed");
            }
            setJobId(data.jobId);
            toast.success("File uploaded for Processing!");
          } catch (err) {
            toast.error("Upload failed for Processing!");
            console.error(err);
          } finally {
            setLoading(false);
          }
        }
      }
    });
    el.click();
  }, []);

  const uploadFolder = useCallback(() => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", FILE_ACCEPT);
    el.setAttribute("multiple", "true");
    el.setAttribute("webkitdirectory", "true");
    el.setAttribute("directory", "true");
    el.addEventListener("change", async () => {
      if (el.files && el.files.length > 0) {
        const files = Array.from(el.files);
        if (files.length > 0) {
          const formData = new FormData();
          for (const file of files) {
            formData.append("files", file);
          }
          try {
            setLoading(true);
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/upload/folder`,
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await response.json();
            setJobId(data.jobId);
            if (!response.ok) {
              throw new Error("Upload failed");
            }

            toast.success("Folder uploaded for Processing!");
          } catch (err) {
            toast.error("Upload failed for Processing!");
            console.error(err);
          } finally {
            setLoading(false);
          }
        }
      }
    });
    el.click();
  }, []);

  return { loading, jobId, uploadFile, uploadFolder };
}
