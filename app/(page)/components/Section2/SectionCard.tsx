"use client";
import React from "react";

function SectionCard({
  title,
  content,
  headerBgColor,
  headerTextColor = "white",
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
    <div
      className="w-full flex flex-col items-center overflow-hidden rounded-lg shadow-lg animate-float"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="w-full py-2 px-4 flex justify-center text-lg font-bold"
        style={{ backgroundColor: headerBgColor, color: headerTextColor }}
      >
        {title}
      </div>
      <p className="w-full flex flex-col bg-background p-4 break-keep whitespace-pre-wrap h-full">
        {content}
        {children}
      </p>
    </div>
  );
}

export default SectionCard;
