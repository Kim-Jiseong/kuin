"use client";
import MajorSelectTab from "@/components/MajorSelectTab/MajorSelectTab";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle } from "lucide-react";
import React from "react";
import NextLink from "next/link";

function FloatMenuContainer({
  major,
  setMajor,
}: {
  major: string;
  setMajor: (major: string) => void;
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-2 px-6 bg-gray-900/90 dark:bg-white/90 backdrop-blur-md rounded-full fixed bottom-8 left-1/2 -translate-x-1/2 z-50 shadow-2xl border border-white/10 dark:border-gray-200 flex gap-6 items-center transition-all">
      <NextLink className="flex justify-start items-center group" href="/">
        <span className="font-bold text-white dark:text-gray-900 text-lg tracking-tight group-hover:text-primary transition-colors">
          KUIN
        </span>
      </NextLink>
      <div className="h-6 w-[1px] bg-white/20 dark:bg-gray-300" />
      <MajorSelectTab major={major} setMajor={setMajor} />
      <div className="h-6 w-[1px] bg-white/20 dark:bg-gray-300" />
      <Button
        onClick={scrollToTop}
        size="icon"
        variant="ghost"
        className="text-white dark:text-gray-900 hover:bg-white/20 dark:hover:bg-gray-100 rounded-full h-8 w-8"
      >
        <ArrowUpCircle size={20} />
      </Button>
    </div>
  );
}

export default FloatMenuContainer;
