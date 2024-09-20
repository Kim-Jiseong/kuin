"use client";
import React from "react";
import styled from "styled-components";

function SectionCard({
  title,
  content,
  headerBgColor,
  headerTextColor,
  delay = 0,
  children,
}: {
  title: string;
  content: string;
  headerBgColor: string;
  headerTextColor?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <CardContainer
      className={`w-full flex flex-col items-center overflow-hidden rounded-lg shadow-lg`}
      delay={delay}
    >
      <div
        className={`
            w-full py-2 px-4 flex justify-center 
            bg-${headerBgColor} text-${headerTextColor}
            text-lg font-bold
            `}
      >
        {title}
      </div>
      <p className="w-full flex flex-col bg-background p-4 break-keep whitespace-pre-wrap h-full">
        {content}
        {children}
      </p>
    </CardContainer>
  );
}

export default SectionCard;

const CardContainer = styled.div<{ delay: number }>`
  animation: float 1s ease-out infinite alternate;
  animation-delay: ${({ delay }) => delay}s;
  @keyframes float {
    0% {
      transform: translateY(2%);
    }
    100% {
      transform: translateY(-2%);
    }
  }
`;
