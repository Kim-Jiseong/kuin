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
    <div className="py-2 px-4 bg-foreground/80 backdrop-blur-sm rounded-full fixed bottom-8 left-1/2 -translate-x-1/2 z-10 shadow-2xl border border-border flex gap-4 items-center">
      <NextLink className="flex justify-start items-center" href="/">
        <p className="font-bold text-background px-1">KUIN</p>
      </NextLink>
      <MajorSelectTab major={major} setMajor={setMajor} bgColor="foreground" />
      <Button
        onClick={scrollToTop}
        size="icon"
        className="bg-foreground text-background rounded-full hover:bg-foreground/90"
      >
        <ArrowUpCircle />
      </Button>
    </div>
  );
}

export default FloatMenuContainer;
