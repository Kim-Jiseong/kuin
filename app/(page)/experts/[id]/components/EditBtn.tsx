"use client";
import { Button } from "@/components/ui/button";
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
      size="sm"
      variant="ghost"
      onClick={handleEditClick}
      className="rounded-full bg-white/20 dark:bg-black/20 border-border border"
    >
      <Pencil size={16} className="mr-2" />
      프로필 수정
    </Button>
  );
}

export default EditBtn;
