"use client";
import { Avatar as NextUIAvatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDisclosure } from "@nextui-org/modal";
import { Tables } from "@/types/database.types";

function Avatar({ profile }: { profile: Tables<"profile"> | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClick = () => {
    if (profile) {
      console.log("clicked");
      onOpen();
    } else {
      router.push("/auth?next=" + pathname);
    }
  };
  return (
    <div>
      <NextUIAvatar
        className="cursor-pointer"
        onClick={handleClick}
        isBordered
        src={profile ? (profile.image as string) : undefined}
        style={{ flexShrink: 0 }}
        size="sm"
      />
      <ProfileModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        profile={profile}
      />
    </div>
  );
}

export default Avatar;
