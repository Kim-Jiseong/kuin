"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* <SessionProvider> */}
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </NextThemesProvider>
        </NextUIProvider>
        {/* </SessionProvider> */}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
