import { Metadata } from "next";

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

/**
 * Auth 레이아웃 - 로그인 페이지 전용
 * html/body는 루트 레이아웃에서 정의됨
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
