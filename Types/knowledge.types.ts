export type SourceStatus = "indexed" | "indexing" | "failed" | "pending";

export interface KnowledgeSourceItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  status: SourceStatus;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: "documents" | "folders" | "tokens" | "status";
}
