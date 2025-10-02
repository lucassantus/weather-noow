import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface CardCoverLoadingProps extends PropsWithChildren {
  className: string;
}

export function CardCoverLoading({
  children,
  className,
}: CardCoverLoadingProps) {
  return (
    <div className={cn("h-full gap-4 rounded-lg border p-5", className)}>
      {children}
    </div>
  );
}
