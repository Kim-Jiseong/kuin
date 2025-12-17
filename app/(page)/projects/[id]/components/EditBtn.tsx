"use client";
import { Button } from "@/components/ui/button";
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
        className="rounded-full"
        size="sm"
        variant="secondary"
        onClick={handleEditClick}
      >
        <Pencil size={16} className="mr-2" />
        프로젝트 수정
      </Button>
    </div>
  );
}

export default EditBtn;
