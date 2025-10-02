"use client";

import { Framing } from "@/components/framing";
import { LogoIcon } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { bounceAnimationVerticalDislocate } from "@/utils/animation/bounceAnimationVerticalDislocate";
import { useRouter } from "next/navigation";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const router = useRouter();

  return (
    <Framing {...bounceAnimationVerticalDislocate({ delay: 0.2 })}>
      <div
        className={cn(
          "flex h-16 w-full items-center justify-between rounded-lg border border-custom-gray-500 bg-custom-gray-200/40 bg-custom-gray-700 p-6 shadow-sm",
          className,
        )}
      >
        <Button
          className="flex items-center gap-2 text-xl text-white/60 !no-underline"
          onClick={() => router.back()}
          aria-label="Retornar para a página anterior"
          variant="link"
        >
          <LogoIcon className="h-7 w-7" />
          Weather Noow
        </Button>
      </div>
    </Framing>
  );
}
