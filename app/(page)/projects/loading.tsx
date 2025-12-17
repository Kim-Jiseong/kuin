import { ProjectListSkeleton } from "@/components/skeletons/ListSkeletons";

/**
 * 프로젝트 리스트 페이지 로딩 스켈레톤
 * FullPageSpinner 대신 실제 레이아웃과 유사한 스켈레톤 표시
 */
export default function Loading() {
  return (
    <div className="container mx-auto w-full max-w-7xl px-6 flex-grow min-h-[calc(100vh-4rem)]">
      <div className="w-full flex flex-col pt-2">
        <div className="w-full flex flex-col gap-4 pt-2 items-center">
          {/* 검색 영역 스켈레톤 */}
          <div className="w-full flex gap-1 items-center max-w-xl">
            <div className="h-8 w-full bg-muted/40 rounded-lg animate-pulse" />
            <div className="h-8 w-8 bg-muted/40 rounded-lg animate-pulse" />
          </div>
          <div className="w-full flex items-end sm:items-center justify-between gap-4 sm:py-4">
            <div className="h-9 w-28 bg-muted/40 rounded-lg animate-pulse" />
            <div className="h-9 w-36 bg-muted/40 rounded-lg animate-pulse" />
          </div>
        </div>
        <ProjectListSkeleton count={2} />
      </div>
    </div>
  );
}
