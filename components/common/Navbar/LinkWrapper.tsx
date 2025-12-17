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
            "relative flex items-center justify-center h-full py-2 text-sm font-medium transition-colors hover:text-primary",
            "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
            "w-full md:w-auto", // Mobile full width, Desktop auto
            pathname === item.href
              ? "text-primary font-bold after:w-full"
              : "text-muted-foreground after:w-0 hover:after:w-full"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default LinkWrapper;
