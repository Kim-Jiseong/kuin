"use client";
import React from "react";
import Typography from "../common/Typography";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

function NewExpertProfileCard({
  myId,
  onClose,
}: {
  myId: string | undefined;
  onClose?: () => void;
}) {
  const router = useRouter();
  if (!myId) return;
  else
    return (
      <div className="container flex flex-col gap-4 w-full p-8 justify-center items-center rounded-md border-1 border-divider border-dashed">
        <Typography variant="text">
          아직 전문가 프로필이 존재하지 않아요
        </Typography>
        <Button
          variant={"flat"}
          color={"primary"}
          onClick={() => {
            router.push("/experts/" + myId);
            if (onClose) {
              onClose();
            }
          }}
        >
          전문가 프로필 만들기
        </Button>
      </div>
    );
}

export default NewExpertProfileCard;
