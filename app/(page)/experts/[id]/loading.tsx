import { Skeleton } from "@/components/ui/skeleton";

/**
 * 전문가 상세 페이지 로딩 스켈레톤
 * 희미하게 표시하여 로딩 중임을 인지시키되 실제 데이터와 구분
 */
export default function Loading() {
  return (
    <div className="container mx-auto w-full max-w-7xl px-6 py-6 opacity-50">
      <div className="w-full flex flex-col gap-6">
        {/* 프로필 헤더 */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Skeleton className="h-32 w-32 rounded-xl flex-shrink-0 bg-muted/40" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-6 w-28 bg-muted/40" />
            <Skeleton className="h-4 w-40 bg-muted/40" />
          </div>
        </div>

        {/* 포트폴리오 */}
        <div className="flex gap-3">
          <Skeleton className="h-24 w-24 rounded-lg bg-muted/40" />
          <Skeleton className="h-24 w-24 rounded-lg bg-muted/40" />
        </div>

        {/* 소개 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full bg-muted/40" />
          <Skeleton className="h-4 w-3/4 bg-muted/40" />
        </div>
      </div>
    </div>
  );
}
