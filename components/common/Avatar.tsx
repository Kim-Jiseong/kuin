"use client";
import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { Tables } from "@/types/database.types";
import { usePathname, useRouter } from "next/navigation";

function Avatar({
  profile,
  projectList,
}: {
  profile: Tables<"profile"> | null;
  projectList: Tables<"project">[] | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    if (profile) {
      setIsOpen(true);
    } else {
      router.push("/auth?next=" + pathname);
    }
  };

  return (
    <div>
      <UIAvatar
        className="cursor-pointer h-8 w-8"
        onClick={handleClick}
      >
        <AvatarImage src={profile ? (profile.image as string) : undefined} />
        <AvatarFallback>{profile?.name?.charAt(0).toUpperCase()}</AvatarFallback>
      </UIAvatar>
      <ProfileModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        profile={profile}
        projectList={projectList}
      />
    </div>
  );
}

export default Avatar;
