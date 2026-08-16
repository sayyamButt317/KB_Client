"use client";

import Link from "next/link";
import { LayoutGrid, MessageSquare, Settings, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem, NavItemId } from "@/Types/navigation.types";

const NAV_ITEMS: NavItem[] = [
  { id: "chat", label: "Chat", icon: MessageSquare, href: "/" },
  { id: "sources", label: "Sources", icon: Layers, href: "/docs" },
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid, href: "#" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
];

interface NavMenuProps {
  activeItem?: NavItemId;
}

export function NavMenu({ activeItem = "chat" }: NavMenuProps) {
  return (
    <nav className="space-y-1 px-4">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeItem;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#EEF2FF] text-[#6366F1]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4",
                isActive ? "text-[#6366F1]" : "text-gray-400"
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
