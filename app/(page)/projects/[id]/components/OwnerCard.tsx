"use client";
import { Tables } from "@/types/database.types";
import { User } from "@nextui-org/react";
import React from "react";

function OwnerCard({ owner_profile }: { owner_profile: any }) {
  return (
    <div>
      <User
        name={owner_profile?.name}
        // description="Product Designer"
        avatarProps={{
          src: owner_profile?.image,
          size: "sm",
        }}
      />{" "}
    </div>
  );
}

export default OwnerCard;
