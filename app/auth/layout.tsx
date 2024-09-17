import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "../providers";

import { fontSans } from "@/config/fonts";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "KUIN-로그인",
  alternates: {
    canonical: "https://kuin.me/auth",
  },
  openGraph: {
    title: "KUIN-로그인",
    description: "KUIN-로그인",
    url: "https://kuin.me/auth",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Suspense>
              <main className="container mx-auto flex-grow">{children}</main>
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
