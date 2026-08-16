import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function BrandLogo({ className, showSubtitle = false }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6366F1] shadow-sm">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 4.5C6 3.67 6.67 3 7.5 3H16.5C17.33 3 18 3.67 18 4.5V19.5C18 20.33 17.33 21 16.5 21H7.5C6.67 21 6 20.33 6 19.5V4.5Z"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M9 7H15M9 11H15M9 15H12"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-base font-bold tracking-tight text-gray-900">
          KnowBase
        </p>
        {showSubtitle && (
          <p className="text-xs text-gray-500">Knowledge Assistant</p>
        )}
      </div>
    </div>
  );
}
