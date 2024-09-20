"use client";
import Typography from "@/components/common/Typography";
import { Tables } from "@/types/database.types";
import { Button } from "@nextui-org/button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React from "react";
import lottieJson from "@/public/lottie/section4.json";
import LottieComponent from "@/components/common/LottieComponent";

function FourthSection({
  user,
  profile,
}: {
  user: User | null;
  profile: Tables<"profile"> | null;
}) {
  const router = useRouter();
  const handleClick = (url: string) => {
    if (user) {
      router.push(url);
    } else {
      router.push("/auth");
    }
  };
  return (
    <section
      className={
        "w-full px-6 py-12 flex flex-col items-center justify-center min-h-96 bg-content2"
      }
    >
      <div
        className={
          "max-w-3xl w-full flex flex-col-reverse md:flex-row justify-between items-center gap-6 "
        }
      >
        <div className="w-full flex flex-col gap-2 items-center md:items-start">
          <Typography variant={"title"}>지금 바로 시작해보세요</Typography>
          <Typography variant={"subtitle2"} className={`text-gray-500 text-center`}>
            5초만에 시작하고, 프로젝트와 전문가 프로필을 등록해보세요
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              className={`mt-4 font-bold`}
              color="primary"
              variant={"bordered"}
              onClick={() => handleClick("/projects/new")}
            >
              프로젝트 등록하기
            </Button>
            <Button
              className={`mt-4 font-bold`}
              color="primary"
              onClick={() => handleClick("/experts/edit/" + profile?.id)}
            >
              전문가 등록하기
            </Button>
          </div>
        </div>
        <div className="max-w-[300px] w-full flex flex-shrink-0">
          <LottieComponent lottieJson={lottieJson} />
        </div>
      </div>
    </section>
  );
}

export default FourthSection;
