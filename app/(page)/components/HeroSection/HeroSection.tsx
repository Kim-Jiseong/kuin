import React from "react";
import TypingEffect from "./TypingEffect";
import CTABtn from "./CTABtn";

function HeroSection() {
  const strings = [
    "웹사이트 모바일 UI 적용",
    "홍보 이미지 디자인",
    "랜딩페이지 퍼블리싱",
    "브랜드 로고 디자인",
    "데이터베이스 이전",
    "제품 팜플렛 디자인",
    // "구글 검색 트렌드 키워드 정리",
    // "인플루언서 리스트업",
    "상품 상세설명 디자인",
  ];
  return (
    <section className="bg-gray-900 py-20 px-4">
      <div className="container mx-auto text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold flex flex-col gap-4 justify-center items-center">
          <div className="py-2 pl-3 pr-2 bg-content3 w-fit rounded-lg flex items-center">
            <TypingEffect textArray={strings} />
          </div>
          <div className="inline-block break-keep text-gray-50">
            <b className="text-primary">48시간&nbsp;</b>
            안에 끝내드립니다
          </div>
        </h1>
        <p className="mt-4 text-lg text-gray-500 break-keep">
          귀찮지만 꼭 필요한 일들을 위한 합리적인 초단기 아웃소싱
        </p>
        <CTABtn />
      </div>
    </section>
  );
}

export default HeroSection;
