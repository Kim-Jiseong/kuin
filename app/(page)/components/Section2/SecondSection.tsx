"use client";
import React from "react";
import SectionCard from "./SectionCard";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

function SecondSection() {
  const router = useRouter();
  return (
    <section
      className={
        "w-full px-6 py-12 flex flex-col justify-center min-h-96 bg-content2"
      }
    >
      <div
        className={`container mx-auto max-w-7xl w-full flex flex-col md:flex-row justify-between gap-8`}
      >
        <SectionCard
          title={` 간편하게 프로젝트를 올려보세요`}
          content={`원하는 결과물에 대한 설명과 함께 프로젝트를 업로드하시면, 24시간 이내에 전문가들과 매칭해드립니다`}
          headerBgColor={"primary"}
          headerTextColor={"background"}
          delay={0.5}
        />
        <SectionCard
          title={`그냥 냅다 연락하셔도 됩니다`}
          content={`프로젝트 올리는것도 귀찮으시다고요? \n원하는 전문가를 검색하시고 그냥 냅다 연락하셔도 됩니다. \n쿠인은 아무것도 막지 않습니다.`}
          headerBgColor={"default"}
        />
        <SectionCard
          title={`지금 바로 5초만에 시작해보세요`}
          content={`진짜로 5초밖에 안걸립니다. \n지금 바로 회원가입하고 48시간 내에 프로젝트가 완료되는 마법같은 모습을 확인하세요`}
          headerBgColor={"danger"}
          headerTextColor={"background"}
          delay={1.5}
        >
          {
            <Button
              color="danger"
              className="mt-4 font-bold"
              onClick={() => router.push("/auth")}
            >
              바로 시작하기
            </Button>
          }
        </SectionCard>
      </div>
    </section>
  );
}

export default SecondSection;
