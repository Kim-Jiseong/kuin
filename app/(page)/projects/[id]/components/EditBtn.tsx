"use client";
import { Button } from "@nextui-org/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function EditBtn({ projectId }: { projectId: string }) {
  const router = useRouter();
  const handleEditClick = () => {
    router.push(`/projects/edit/${projectId}`);
  };

  return (
    <div>
      <Button
        radius="full"
        size="sm"
        variant="flat"
        startContent={<Pencil size={16} />}
        onPress={handleEditClick}
      >
        프로젝트 수정
      </Button>
    </div>
  );
}

export default EditBtn;
