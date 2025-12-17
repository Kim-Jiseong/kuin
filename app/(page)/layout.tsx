import { Suspense } from "react";
import { NavbarWrapper } from "@/components/common/Navbar/NavbarWrapper";
import { NavbarSkeleton } from "@/components/common/Navbar/NavbarSkeleton";

/**
 * (page) 그룹 레이아웃 - Navbar 포함한 일반 페이지용
 * html/body는 루트 레이아웃에서 정의됨
 */
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Suspense fallback={<NavbarSkeleton />}>
        <NavbarWrapper />
      </Suspense>
      <main className="mx-auto w-full flex-grow min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}
