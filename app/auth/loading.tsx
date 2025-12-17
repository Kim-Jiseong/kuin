import { Spinner } from "@/components/ui/spinner";

/**
 * Auth 페이지 로딩 스켈레톤
 * 간단한 스피너로 로딩 피드백 제공
 */
export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-8 w-8 text-primary" />
        <p className="text-sm text-muted-foreground">로딩 중...</p>
      </div>
    </div>
  );
}
