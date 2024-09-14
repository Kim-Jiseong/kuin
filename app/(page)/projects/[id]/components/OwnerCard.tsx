"use client";
import { Tables } from "@/types/database.types";
import { formatDateTime } from "@/utils/formatTime";
import { User } from "@nextui-org/react";
import React from "react";

function OwnerCard({
  owner_profile,
  created_at,
}: {
  owner_profile: any;
  created_at: string;
}) {
  return (
    <div>
      <User
        name={owner_profile?.name}
        description={
          formatDateTime(created_at, {
            locale: "ko",
            // showRelative: false,
          }) + "에 업로드"
        }
        avatarProps={{
          src: owner_profile?.image,
          size: "sm",
        }}
      />
    </div>
  );
}

export default OwnerCard;
