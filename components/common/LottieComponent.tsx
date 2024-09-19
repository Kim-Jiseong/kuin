"use client";
import React from "react";
import Lottie from "react-lottie-player";

function LottieComponent({
  lottieJson,
  loop = true,
}: {
  lottieJson: any;
  loop?: boolean;
}) {
  return (
    <div className="w-full">
      <Lottie loop animationData={lottieJson} play />
    </div>
  );
}

export default LottieComponent;
