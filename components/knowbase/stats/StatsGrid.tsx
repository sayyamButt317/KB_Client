import {
  FileText,
  FolderOpen,
  Database,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/Types/knowledge.types";

const ICON_MAP = {
  documents: FileText,
  folders: FolderOpen,
  tokens: Database,
  status: BarChart3,
} as const;

const ICON_COLORS = {
  documents: "bg-[#EEF2FF] text-[#6366F1]",
  folders: "bg-blue-50 text-blue-600",
  tokens: "bg-emerald-50 text-emerald-600",
  status: "bg-orange-50 text-orange-600",
} as const;

interface StatsCardProps {
  stat: StatItem;
}

export function StatsCard({ stat }: StatsCardProps) {
  const Icon = ICON_MAP[stat.icon];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            ICON_COLORS[stat.icon]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
          <p className="text-sm font-medium text-gray-700">{stat.label}</p>
          <p className="mt-0.5 text-xs text-gray-500">{stat.description}</p>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_STATS: StatItem[] = [
  {
    id: "documents",
    label: "Documents",
    value: "—",
    description: "Total files in knowledge base",
    icon: "documents",
  },
  {
    id: "folders",
    label: "Folders",
    value: "—",
    description: "Organized in collections",
    icon: "folders",
  },
  {
    id: "tokens",
    label: "Tokens",
    value: "—",
    description: "Total indexed tokens",
    icon: "tokens",
  },
  {
    id: "status",
    label: "Status",
    value: "Ready",
    description: "Knowledge base status",
    icon: "status",
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {DEFAULT_STATS.map((stat) => (
        <StatsCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
