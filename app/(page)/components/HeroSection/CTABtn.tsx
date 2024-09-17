"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

function CTABtn() {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        color="success"
        onPress={() => router.push("/projects")}
        className={`font-semibold mt-6`}
        variant={"shadow"}
      >
        쿠인 프로젝트 둘러보기
      </Button>
      <Button
        color="primary"
        onPress={() => router.push("/experts")}
        className={`font-semibold mt-6`}
        variant={"shadow"}
      >
        쿠인 전문가 둘러보기
      </Button>
    </div>
  );
}

export default CTABtn;
