"use client";

import { Tables } from "@/types/database.types";
import { formatDateTime } from "@/utils/formatTime";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import ContactBtn from "./ContactBtn";
import EditBtn from "./EditBtn";
import Typography from "@/components/common/Typography";

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
    <div className="flex gap-4 flex-col items-start sm:flex-row">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={ownerProfile?.image} />
          <AvatarFallback>{ownerProfile?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Typography variant="text" className="font-semibold">
            {ownerProfile?.name}
          </Typography>
          <Typography variant="caption" color="muted">
            {formatDateTime(projectData?.created_at, {
              locale: "ko",
            })}에 업로드
          </Typography>
        </div>
      </div>
      <div className="flex gap-2">
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
