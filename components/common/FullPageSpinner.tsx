"use client";
import { Spinner } from "@nextui-org/react";
import React from "react";

function FullPageSpinner() {
  return (
    <div
      className={
        "w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center bg-background bg-opacity-50 z-50"
      }
    >
      <Spinner />
    </div>
  );
}

export default FullPageSpinner;
