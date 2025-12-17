"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function CTABtn() {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Button
        onClick={() => router.push("/projects")}
        className="h-14 px-8 text-lg font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
        size="lg"
      >
        🚀 프로젝트 둘러보기
      </Button>
      <Button
        onClick={() => router.push("/experts")}
        className="h-14 px-8 text-lg font-bold rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/60 backdrop-blur-sm shadow-lg transition-all hover:-translate-y-1"
        variant="ghost"
        size="lg"
      >
        ✨ 전문가 찾기
      </Button>
    </div>
  );
}

export default CTABtn;
