"use client";
import { Card, Skeleton, Spinner } from "@nextui-org/react";
import React from "react";

function FullPageSpinner() {
  return (
    <div
      className={
        "w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center bg-background bg-opacity-80 z-50"
      }
    >
      {/* <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card> */}
      <Spinner size={"lg"} />
    </div>
  );
}

export default FullPageSpinner;
