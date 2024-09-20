"use client";
import Typography from "@/components/common/Typography";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

function FourthSection() {
  const router = useRouter();
  return (
    <section
      className={
        "w-full px-6 py-12 flex flex-col justify-center min-h-96 bg-content2"
      }
    >
      <div className={"w-2xl mx-auto flex justify-between items-center gap-6"}>
        <div className="flex flex-col gap-2 items-start">
          <Typography variant={"title"}>지금 바로 시작해보세요</Typography>
          <Typography variant={"subtitle2"} className={`text-gray-500`}>
            5초만에 시작하고, 프로젝트 또는 전문가 프로필을 등록해보세요
          </Typography>
          <Button
            color="primary"
            size="lg"
            onClick={() => router.push("/auth")}
          >
            시작하기
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FourthSection;
