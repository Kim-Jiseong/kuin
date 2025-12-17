/**
 * 프로젝트 상태 코드에 따른 Badge 스타일을 반환하는 유틸 함수
 */

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface ProjectStatusBadgeStyle {
  variant: BadgeVariant;
  className?: string;
}

/**
 * 프로젝트 상태 코드에 따라 Badge의 variant와 className을 반환합니다.
 * @param statusCode - 프로젝트 상태 코드 (open, ongoing, done, canceled)
 * @returns Badge 스타일 객체 { variant, className }
 */
export function getProjectStatusBadgeStyle(
  statusCode: string | null
): ProjectStatusBadgeStyle {
  if (!statusCode) {
    return { variant: "default" };
  }

  const styleMap: Record<string, ProjectStatusBadgeStyle> = {
    open: { variant: "default" },
    ongoing: { variant: "secondary", className: "bg-blue-500 text-white" },
    done: { variant: "outline", className: "bg-green-500 text-white" },
    canceled: {
      variant: "destructive",
      className: "bg-muted text-muted-foreground",
    },
  };

  return styleMap[statusCode] || { variant: "default" };
}
