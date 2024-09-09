"use client";
import { Button } from "@nextui-org/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function EditBtn({ profileId }: { profileId: string }) {
  const router = useRouter();
  const handleEditClick = () => {
    router.push(`/experts/edit/${profileId}`);
  };

  return (
    <Button
      radius="full"
      size="sm"
      // color={"success"}
      variant="light"
      startContent={<Pencil size={16} />}
      onPress={handleEditClick}
      className="absolute right-3 top-3 bg-white/20  dark:bg-black/20"
    >
      프로필 수정
    </Button>
  );
}

export default EditBtn;
