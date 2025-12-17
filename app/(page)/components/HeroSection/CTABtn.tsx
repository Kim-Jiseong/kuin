"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function CTABtn() {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => router.push("/projects")}
        className="font-semibold mt-6 shadow-lg"
        variant="default"
      >
        쿠인 프로젝트 둘러보기
      </Button>
      <Button
        onClick={() => router.push("/experts")}
        className="font-semibold mt-6 shadow-lg"
        variant="default"
      >
        쿠인 전문가 둘러보기
      </Button>
    </div>
  );
}

export default CTABtn;
