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
    <section className="relative w-full py-32 lg:py-48 overflow-hidden bg-gray-950">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="container relative mx-auto px-4 flex flex-col items-center text-center z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight flex flex-col gap-6 items-center">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 py-4 px-8 rounded-2xl flex items-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <TypingEffect textArray={strings} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white mt-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#E54600] drop-shadow-sm">
              48시간
            </span>
            <span className="text-gray-100">안에 끝내보세요.</span>
          </div>
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-2xl break-keep leading-relaxed font-medium">
          귀찮지만 꼭 필요한 일들을 위한
          <br className="md:hidden" /> 합리적인 초단기 아웃소싱 플랫폼
        </p>
        <div className="mt-12">
          <CTABtn />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
