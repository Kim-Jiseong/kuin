"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { Toaster } from "@/components/ui/sonner";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: React.ComponentProps<typeof NextThemesProvider>;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...themeProps}>
        {children}
        <Toaster />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
