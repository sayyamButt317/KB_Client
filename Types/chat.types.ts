export interface DocumentSource {
  pageContent?: string;
  folderName?: string;
  fileName?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

export type MessageRole = "assistant" | "user";

export interface ChatMessage {
  role: MessageRole;
  content?: string;
  documents?: DocumentSource[];
  timestamp?: string;
}

export interface SessionInfo {
  sourcesUsed: number;
  tokensUsed: number;
  model: string;
  responseTimeSec: number | null;
  topSources: Array<{
    name: string;
    confidence: number;
  }>;
}
