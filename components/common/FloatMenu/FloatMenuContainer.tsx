"use client";
import MajorSelectTab from "@/components/MajorSelectTab/MajorSelectTab";
import { Button } from "@nextui-org/button";
import { ArrowUpCircle } from "lucide-react";
import React from "react";
import NextLink from "next/link";

function FloatMenuContainer({
  major,
  setMajor,
}: {
  major: string;
  setMajor: any;
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={`
        py-2 px-4 bg-foreground bg-opacity-80 rounded-full
         fixed bottom-8 left-[50%] translate-x-[-50%] z-10 
         shadow-2xl border-1 border-divider
         flex gap-4 items-center
         `}
    >
      <NextLink className="flex justify-start items-center" href="/">
        <p className="font-bold text-background px-1">KUIN</p>
      </NextLink>
      <MajorSelectTab
        major={major}
        setMajor={setMajor}
        bgColor={"foreground"}
      />
      <Button
        isIconOnly
        onPress={scrollToTop}
        className={"bg-foreground text-background rounded-full"}
      >
        <ArrowUpCircle />
      </Button>
    </div>
  );
}

export default FloatMenuContainer;
