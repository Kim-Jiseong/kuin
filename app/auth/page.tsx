"use client";
import Typography from "@/components/common/Typography";

import React from "react";
import { OAuthButtons } from "./oauth-signin";
import { useParams } from "next/navigation";

function Auth({ searchParams }: { searchParams: any }) {
  // console.log(searchParams.next);
  const next = searchParams?.next || null;
  // const next = searchParams.get("next") || null;
  return (
    <div className={"w-full h-full flex flex-col items-center justify-center "}>
      <div className="max-w-xl text-center justify-center flex flex-col gap-4 p-8">
        <Typography variant={"headings"}>KUIN&nbsp;</Typography>
        <Typography variant={"title"}>
          <span className={"text-primary"}>48시간 </span>안에 끝나는
          <br />
          합리적인 <span className={"text-primary"}>초단기 아웃소싱 </span>
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
