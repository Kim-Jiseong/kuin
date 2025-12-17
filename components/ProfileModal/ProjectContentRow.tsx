"use client";
import React, { useEffect, useState } from "react";
import Typography from "../common/Typography";
import { Tables } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Trash2 } from "lucide-react";
import StatusEditDropdown from "../common/ProjectStatusEditDropdown";
import { deleteProject, updateProjectStatus } from "@/service/project/action";
import { getMajorObjByCode } from "@/utils/getMajorObjByCode";
import { returnMajorColor } from "@/utils/returnMajorColor";

function ProjectContentRow({
  project,
  handleRouting,
}: {
  project: Tables<"project">;
  handleRouting: (url: string) => void;
}) {
  const [status, setStatus] = useState(project.status);
  const [isInitial, setIsInitial] = useState(true);
  const handleUpdateStatus = async () => {
    await updateProjectStatus(status, project.id);
  };
  useEffect(() => {
    if (!isInitial) {
      handleUpdateStatus();
    }
    setIsInitial(false);
  }, [status]);
  return (
    <div className="w-full flex justify-between items-center py-2 px-3 rounded-md border border-border/40 hover:bg-secondary/50 transition-colors cursor-pointer group">
      <div
        role="button"
        className={`flex flex-col w-full`}
        onClick={() => handleRouting(`/projects/${project.id}`)}
      >
        <Typography
          variant={"text"}
          ellipsis
          lines={1}
          className={"mb-1 font-semibold flex items-center gap-2"}
        >
          <Badge variant="secondary" className="align-middle whitespace-nowrap">
            {getMajorObjByCode(project.major as string)?.name}
          </Badge>
          {project.title}
        </Typography>
        <Typography
          variant={"caption"}
          className={"text-xs text-muted-foreground"}
        >
          {new Date(project.created_at).toLocaleDateString()}
        </Typography>
      </div>
      <div className="flex gap-2 items-center shrink-0 ml-4">
        <StatusEditDropdown status={status} setStatus={setStatus} />
        <Button
          variant="secondary"
          color={"danger"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            deleteProject(project.id);
          }}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}

export default ProjectContentRow;
