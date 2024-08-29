"use client";
import { Avatar as NextUIAvatar } from "@nextui-org/avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDisclosure } from "@nextui-org/modal";

function Avatar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClick = () => {
    if (status !== "loading") {
      if (session) {
        onOpen();
      } else {
        router.push("/auth");
      }
    }
  };
  return (
    <div>
      <NextUIAvatar
        className="cursor-pointer"
        onClick={handleClick}
        isBordered
        src={session ? (session.profile?.image as string) : undefined}
        style={{ flexShrink: 0 }}
      />
      <ProfileModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default Avatar;
