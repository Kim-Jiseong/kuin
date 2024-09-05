"use client";
import Typography from "@/components/common/Typography";
import { GoogleIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

function Auth() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  return (
    <div className={"w-full h-full flex flex-col items-center justify-center "}>
      <div className="max-w-xl text-center justify-center flex flex-col gap-4 p-8">
        <Typography variant={"headings"}>KUIN&nbsp;</Typography>
        <Typography variant={"title"}>
          대학생과 함께하는 <br />
          <span className={"text-primary"}>빠르고 합리적인</span> 프로젝트 매칭
          플랫폼
        </Typography>
        <Button
          radius="sm"
          // onClick={() => console.log(callbackUrl)}
          variant={"shadow"}
          onClick={() => signIn("google", { callbackUrl: callbackUrl })}
          size="lg"
          startContent={<GoogleIcon />}
          className={" bg-background border-2 border-primary mt-10"}
        >
          <Typography variant={"text"} style={{ fontWeight: 500 }}>
            구글 계정으로 5초만에 시작하기
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default Auth;
