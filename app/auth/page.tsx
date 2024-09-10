"use client";
import Typography from "@/components/common/Typography";

import React from "react";
import { OAuthButtons } from "./oauth-signin";
import { useParams } from "next/navigation";

function Auth({ searchParams }: { searchParams: any }) {
  console.log(searchParams.next);
  const next = searchParams?.next || null;
  // const next = searchParams.get("next") || null;
  return (
    <div className={"w-full h-full flex flex-col items-center justify-center "}>
      <div className="max-w-xl text-center justify-center flex flex-col gap-4 p-8">
        <Typography variant={"headings"}>KUIN&nbsp;</Typography>
        <Typography variant={"title"}>
          대학생과 함께하는 <br />
          <span className={"text-primary"}>빠르고 합리적인</span> 프로젝트 매칭
          플랫폼
        </Typography>
        {/* <Button
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
        </Button> */}
        <OAuthButtons next={next} />
      </div>
    </div>
  );
}

export default Auth;
