import { cn } from "@/lib/utils";

import type { PropsWithChildren } from "react";

interface CardCoverProps extends PropsWithChildren {
  title?: string;
  className?: string;
}

export function CardCover({ children, title, className }: CardCoverProps) {
  return (
    <div
      className={cn(
        "h-full gap-4 rounded-lg border border-custom-gray-500 bg-custom-gray-700 p-5 shadow-md",
        className,
      )}
    >
      {title && (
        <span className="text-base font-bold text-custom-gray-400">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
