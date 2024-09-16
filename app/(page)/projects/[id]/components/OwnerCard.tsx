"use client";

import { Tables } from "@/types/database.types";
import { formatDateTime } from "@/utils/formatTime";
import { Button, User } from "@nextui-org/react";
import React from "react";
import ContactBtn from "./ContactBtn";

function OwnerCard({
  owner_profile,
  created_at,
  contact,
  user,
  status,
}: {
  owner_profile: any;
  created_at: string;
  contact: string | null;
  user: any;
  status: string | null;
}) {
  return (
    <div className={`flex gap-4`}>
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
      <ContactBtn
        status={status}
        owner_profile={owner_profile}
        contact={contact}
        isLoggedIn={user ? true : false}
      />
    </div>
  );
}

export default OwnerCard;
