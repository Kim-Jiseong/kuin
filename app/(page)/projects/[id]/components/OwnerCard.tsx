"use client";

import { Tables } from "@/types/database.types";
import { formatDateTime } from "@/utils/formatTime";
import { Button, User } from "@nextui-org/react";
import React from "react";
import ContactBtn from "./ContactBtn";
import EditBtn from "./EditBtn";

function OwnerCard({
  projectData,
  ownerProfile,
  user,
  isMe,
}: {
  projectData: Tables<"project"> | undefined;
  ownerProfile: any;
  user: any;
  isMe: boolean;
}) {
  // console.log("projectData", projectData);
  // console.log("ownerProfile", ownerProfile);

  if (!projectData) return null;
  return (
    <div className={`flex gap-4 flex-col items-start sm:flex-row`}>
      <User
        name={ownerProfile?.name}
        description={
          formatDateTime(projectData?.created_at, {
            locale: "ko",
            // showRelative: false,
          }) + "에 업로드"
        }
        avatarProps={{
          src: ownerProfile?.image,
          size: "sm",
        }}
      />
      <div className={`flex gap-2`}>
        <ContactBtn
          status={projectData?.status}
          owner_profile={projectData?.owner_profile}
          contact={projectData?.contact}
          isLoggedIn={user ? true : false}
        />
        {isMe && <EditBtn projectId={projectData?.id} />}
      </div>
    </div>
  );
}

export default OwnerCard;
