"use client";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function LinkWrapper({
  className,
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex gap-6 ml-2", className)}>
      {siteConfig.navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            "relative flex items-center h-full",
            pathname === item.href
              ? "text-primary font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-[2px] after:bg-primary"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default LinkWrapper;
