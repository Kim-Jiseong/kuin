import Typography from "@/components/common/Typography";
import React from "react";

import lottieJson from "@/public/lottie/section1.json";
import LottieComponent from "@/components/common/LottieComponent";
function FirstSection() {
  return (
    <section
      className={
        "container mx-auto w-full max-w-7xl px-6 py-6 flex-grow min-h-96"
      }
    >
      <div className={"flex justify-between items-center gap-6"}>
        <div id="text-wrapper" className={`w-full flex flex-col gap-4`}>
          <Typography variant={"subtitle1"}>
            귀찮은 일들은 쿠인에 맡기고, 더 생산적인 일에 집중하세요
          </Typography>
          <Typography variant="text" className={`text-lg`}>
            사업을 하다보면 &quot;웹사이트 문구 바꾸기&quot;, &quot;상품
            상세설명 디자인&quot; 같은 귀찮지만 꼭 필요한 일들이 많습니다.
            <br />
            개발, 디자인 전문가에게 맡기면 금방 해결될 일들이지만, 기존 외주
            서비스들은 느리고 비싸죠.
            <br />
            <br />
            쿠인은 이러한 고민 속에서 탄생했습니다. <br />
            이제 쿠인의 전문가들과 함께 귀찮지만 꼭 필요한 일들을 빠르고
            합리적인 가격에 해결하고, 보다 생산적인 업무에 집중하세요.
          </Typography>
        </div>
        <LottieComponent lottieJson={lottieJson} />
      </div>
    </section>
  );
}

export default FirstSection;
