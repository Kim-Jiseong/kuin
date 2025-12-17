import { Skeleton } from "@/components/ui/skeleton";

/**
 * 스켈레톤 공통 스타일: 희미하게 표시하여 실제 데이터와 구분
 */
const skeletonCardClass =
  "w-full lg:w-[calc(50%_-_0.5rem)] h-[auto] lg:h-[200px] rounded-lg p-4 flex flex-col sm:flex-row gap-3 border border-muted/50 opacity-60";

function ProjectCardSkeleton() {
  return (
    <div className={skeletonCardClass}>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <Skeleton className="h-5 w-2/3 bg-muted/50" />
          <Skeleton className="h-4 w-14 rounded-full bg-muted/50" />
        </div>
        <Skeleton className="h-16 w-full bg-muted/50" />
        <div className="flex justify-end">
          <Skeleton className="h-3 w-20 bg-muted/50" />
        </div>
      </div>
    </div>
  );
}

export function ProjectListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="w-full flex flex-wrap gap-4 mt-4 pb-4 opacity-70">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ExpertCardSkeleton() {
  return (
    <div className={skeletonCardClass}>
      <Skeleton className="w-[140px] h-[140px] rounded-xl flex-shrink-0 bg-muted/50" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24 bg-muted/50" />
          <Skeleton className="h-4 w-12 rounded-full bg-muted/50" />
        </div>
        <Skeleton className="h-16 w-full bg-muted/50" />
      </div>
    </div>
  );
}

export function ExpertListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="w-full flex flex-wrap gap-4 mt-4 pb-4 opacity-70">
      {Array.from({ length: count }).map((_, i) => (
        <ExpertCardSkeleton key={i} />
      ))}
    </div>
  );
}

export { ProjectCardSkeleton, ExpertCardSkeleton };
