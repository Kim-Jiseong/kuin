"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * 페이지 전환 시 상단에 표시되는 프로그레스 바
 * 사용자에게 즉각적인 피드백을 제공하여 "무반응" 시간을 없앰
 */
export default function RouteLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 라우트 변경 시 로딩 완료
    setIsLoading(false);
    setProgress(100);

    // 짧은 딜레이 후 프로그레스 바 숨김
    const timer = setTimeout(() => {
      setProgress(0);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // 링크 클릭 감지를 위한 전역 이벤트 리스너
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.href &&
        !anchor.target &&
        !anchor.download &&
        anchor.origin === window.location.origin &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        // 같은 페이지 내 앵커 링크가 아닌 경우에만
        const url = new URL(anchor.href);
        if (url.pathname !== pathname || url.search !== `?${searchParams}`) {
          setIsLoading(true);
          setProgress(30);

          // 프로그레스 애니메이션
          const interval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 90) {
                clearInterval(interval);
                return 90;
              }
              return prev + Math.random() * 10;
            });
          }, 200);

          return () => clearInterval(interval);
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, searchParams]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: isLoading ? 1 : 0,
          transition: isLoading
            ? "width 0.3s ease-out"
            : "width 0.2s ease-out, opacity 0.2s ease-out 0.1s",
        }}
      />
    </div>
  );
}
