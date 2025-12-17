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
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 border border-gray-200 shadow-sm">
          <AvatarImage src={ownerProfile?.image} className="object-cover" />
          <AvatarFallback>
            {ownerProfile?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Typography variant="text" className="font-bold text-lg leading-none">
            {ownerProfile?.name}
          </Typography>
          <Typography variant="caption" className="text-gray-400 mt-1">
            Project Manager
          </Typography>
        </div>
      </div>
      <div className="flex gap-2 w-full mt-2">
        <div className="flex-1">
          <ContactBtn
            status={projectData?.status}
            owner_profile={projectData?.owner_profile}
            contact={projectData?.contact}
            isLoggedIn={user ? true : false}
          />
        </div>
        {isMe && <EditBtn projectId={projectData?.id} />}
      </div>
    </div>
  );
}

export default OwnerCard;
