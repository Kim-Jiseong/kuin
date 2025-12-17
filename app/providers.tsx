"use client";

import * as React from "react";
import { Suspense } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import RouteLoading from "@/components/common/RouteLoading";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: React.ComponentProps<typeof NextThemesProvider>;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextThemesProvider {...themeProps}>
      <Suspense fallback={null}>
        <RouteLoading />
      </Suspense>
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
