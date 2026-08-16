import type { LucideIcon } from "lucide-react";

export type NavItemId = "chat" | "sources" | "dashboard" | "settings";

export interface NavItem {
  id: NavItemId;
  label: string;
  icon: LucideIcon;
  href: string;
}
