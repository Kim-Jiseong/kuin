"use client";
import { siteConfig } from "@/config/site";
import { NavbarItem } from "@nextui-org/navbar";
import NextLink from "next/link";
import clsx from "clsx";
import React from "react";
import { link as linkStyles } from "@nextui-org/theme";
import { usePathname, useRouter } from "next/navigation";

function LinkWrapper() {
  const pathname = usePathname();
  return (
    <ul className="flex gap-4 justify-end ml-2">
      {siteConfig.navItems.map((item) => (
        <NavbarItem key={item.href}>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-bold",
              [
                "flex",
                "relative",
                "h-full",
                "items-center",
                "data-[active=true]:after:content-['']",
                "data-[active=true]:after:absolute",
                "data-[active=true]:after:bottom-0",
                "data-[active=true]:after:left-0",
                "data-[active=true]:after:right-0",
                "data-[active=true]:after:h-[2px]",
                "data-[active=true]:after:rounded-[2px]",
                "data-[active=true]:after:bg-primary",
              ]
            )}
            color="foreground"
            href={item.href}
            data-active={pathname === item.href ? "true" : undefined}
          >
            {item.label}
          </NextLink>
        </NavbarItem>
      ))}
    </ul>
  );
}

export default LinkWrapper;
