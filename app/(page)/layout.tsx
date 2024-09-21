import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata, Viewport } from "next";
import "@/styles/markdown.css";
import clsx from "clsx";

import { Providers } from "../providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/common/Navbar/navbar";
import { createClient } from "@/utils/supabase/server";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profile").select("*").eq("user_id", user.id).single()
    : { data: null };

  const { data: projectList } = profile
    ? await supabase
        .from("project")
        .select("*")
        .eq("owner_profile", profile.id)
        .not("status", "is", null)
        .order("created_at", { ascending: false })
    : { data: null };

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
            <Navbar profile={profile} projectList={projectList} />
            <main className=" mx-auto w-full flex-grow min-h-[calc(100vh-4rem)]">
              {children}
            </main>
            {/* <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
              </Link>
            </footer> */}
          </div>
        </Providers>
      </body>
      {/* <GoogleAnalytics gaId="GTM-KQG559XD" /> */}
      <GoogleAnalytics gaId="G-54X8Q3QSTE" />
    </html>
  );
}
