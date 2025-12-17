import { Skeleton } from "@/components/ui/skeleton";

/**
 * Navbar 로딩 중 표시할 스켈레톤 UI
 * 루트 레이아웃 스트리밍 최적화에 사용
 */
export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 max-w-screen-xl items-center px-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-6 h-6" /> {/* BackButton placeholder */}
          <span className="font-bold">KUIN</span>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </header>
  );
}
