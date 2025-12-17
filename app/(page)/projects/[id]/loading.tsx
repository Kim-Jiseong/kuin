import { Skeleton } from "@/components/ui/skeleton";

/**
 * 프로젝트 상세 페이지 로딩 스켈레톤
 * 희미하게 표시하여 로딩 중임을 인지시키되 실제 데이터와 구분
 */
export default function Loading() {
  return (
    <div className="container mx-auto w-full max-w-7xl px-6 py-6 opacity-50">
      <div className="w-full flex flex-col gap-6">
        {/* 헤더 영역 */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-16 rounded-full bg-muted/40" />
          <Skeleton className="h-8 w-2/3 bg-muted/40" />
        </div>

        {/* 프로필 카드 */}
        <div className="flex items-center gap-3 p-3 border border-muted/30 rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full bg-muted/40" />
          <Skeleton className="h-4 w-24 bg-muted/40" />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full bg-muted/40" />
          <Skeleton className="h-4 w-4/5 bg-muted/40" />
          <Skeleton className="h-4 w-2/3 bg-muted/40" />
        </div>
      </div>
    </div>
  );
}
