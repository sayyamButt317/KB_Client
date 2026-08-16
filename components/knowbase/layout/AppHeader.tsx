"use client";

import { Bell, ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/knowbase/brand/BrandLogo";

interface AppHeaderProps {
  model?: string;
}

export function AppHeader({ model = "GPT-4o" }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <BrandLogo />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-semibold text-gray-900">
            Knowledge Assistant
          </h1>
          <p className="text-sm text-gray-500">
            Ask anything about your documents
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {model}
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6366F1] text-sm font-semibold text-white">
          AM
        </div>
      </div>
    </header>
  );
}
