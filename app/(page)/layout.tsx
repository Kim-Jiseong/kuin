import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata, Viewport } from "next";
import "@/styles/markdown.css";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "../providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { NavbarWrapper } from "@/components/common/Navbar/NavbarWrapper";
import { NavbarSkeleton } from "@/components/common/Navbar/NavbarSkeleton";
import GoogleAdsense from "@/components/GoogleAdsense";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "외주",
    "단기외주",
    "개발 외주",
    "급한 외주",
    "프리랜서",
    "디자인 외주",
    "웹사이트 개발",
    "쿠인",
    "Kuin",
    "kuin",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "쿠인",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // images: ['https://example.com/image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Suspense fallback={<NavbarSkeleton />}>
              <NavbarWrapper />
            </Suspense>
            <main className=" mx-auto w-full flex-grow min-h-[calc(100vh-4rem)]">
              {children}
            </main>
          </div>
        </Providers>
      </body>
      {/* <GoogleAnalytics gaId="GTM-KQG559XD" /> */}
      <GoogleAnalytics gaId="G-54X8Q3QSTE" />
      <GoogleAdsense pId="8710277766749613" />
    </html>
  );
}
