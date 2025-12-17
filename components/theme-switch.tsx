"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { SunFilledIcon, MoonFilledIcon } from "./icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", className)}>
        <SunFilledIcon size={22} />
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "px-px transition-opacity hover:opacity-80 cursor-pointer",
        "w-auto h-auto bg-transparent rounded-lg flex items-center justify-center",
        "text-muted-foreground hover:text-foreground",
        className
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <SunFilledIcon size={22} />
      ) : (
        <MoonFilledIcon size={22} />
      )}
    </button>
  );
};
