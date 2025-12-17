"use client";
import { Spinner } from "@/components/ui/spinner";
import React from "react";

function FullPageSpinner() {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <Spinner className="h-12 w-12" />
    </div>
  );
}

export default FullPageSpinner;
