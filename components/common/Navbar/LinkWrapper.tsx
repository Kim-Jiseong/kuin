"use client";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname } from "next/navigation";

function LinkWrapper() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 ml-2">
      {siteConfig.navItems.map((item) => (
        <NextLink
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            "relative flex items-center h-full",
            pathname === item.href
              ? "text-primary font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-[2px] after:bg-primary"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </NextLink>
      ))}
    </nav>
  );
}

export default LinkWrapper;
