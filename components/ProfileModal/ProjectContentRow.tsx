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
    <div className={`w-full flex justify-between items-center py-2`}>
      <div
        role="button"
        className={`flex flex-col w-full`}
        onClick={() => handleRouting(`/projects/${project.id}`)}
      >
        <Typography
          variant={"text"}
          ellipsis
          lines={1}
          className={"mb-1 font-semibold"}
        >
          <Badge variant="secondary" className="align-middle">
            {getMajorObjByCode(project.major as string)?.name}
          </Badge>
          &nbsp;&nbsp;{project.title}
        </Typography>
        <Typography
          variant={"caption"}
          ellipsis={true}
          lines={1}
          className={"text-xs"}
        >
          {project.introduction}
        </Typography>
      </div>
      <div className="flex gap-2 items-center flex-shrink-0">
        <StatusEditDropdown status={status} setStatus={setStatus} />
        <Button
          variant="secondary"
          color={"danger"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => deleteProject(project.id)}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
}

export default ProjectContentRow;
