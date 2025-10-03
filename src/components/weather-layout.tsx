import type { PropsWithChildren } from "react";

interface WeatherLayoutProps extends PropsWithChildren {}

export function WeatherLayout({ children }: WeatherLayoutProps) {
  return (
    <div className="container flex h-full flex-col 5xl:min-h-screen 5xl:items-center 5xl:justify-center">
      <div className="flex h-full max-h-[1080px] flex-col gap-3 p-3 5xl:min-w-[1920px]">
        <div className="flex-1 space-y-2">{children}</div>
      </div>
    </div>
  );
}
