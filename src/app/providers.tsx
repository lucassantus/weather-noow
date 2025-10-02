"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "dayjs/locale/pt-br";
import { ThemeProvider } from "next-themes";
import { type ReactNode, useState } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster duration={4000} richColors closeButton />

        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
