"use client";

import { useState, useEffect } from "react";

interface TypingEffectProps {
  textArray: string[];
  typingSpeed?: number; // 타이핑 속도 조절
  deletingSpeed?: number; // 삭제 속도 조절
  delayBetween?: number; // 문자열 간 딜레이
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  textArray,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 텍스트 배열 인덱스
  const [displayedText, setDisplayedText] = useState(""); // 화면에 표시되는 텍스트
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 중 상태

  useEffect(() => {
    const currentText = textArray[currentIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // 타이핑 중일 때
      if (displayedText.length < currentText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // 타이핑 완료 후 딜레이
        timer = setTimeout(() => setIsDeleting(true), delayBetween);
      }
    } else {
      // 삭제 중일 때
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        // 삭제 완료 후 다음 텍스트로 넘어감
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    textArray,
    currentIndex,
    typingSpeed,
    deletingSpeed,
    delayBetween,
  ]);

  return (
    <span className="text-2xl font-bold">
      {displayedText}
      <span className="blinking-cursor">|</span> {/* 깜박이는 커서 */}
    </span>
  );
};

export default TypingEffect;
