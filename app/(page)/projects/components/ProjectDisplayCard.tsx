import Typography from "@/components/common/Typography";
import { Tables } from "@/types/database.types";
import { formatDateTime } from "@/utils/formatTime";
import { getStatusNameByCode } from "@/utils/getStatusNameByCode";
import { returnStatusColor } from "@/utils/returnStatusColor";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import React from "react";

function ProjectDisplayCard({ project }: { project: Tables<"project"> }) {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => router.push(`/projects/${project.id}`)}
      className={`w-full lg:w-[calc(50%_-_0.5rem)] 
        h-[auto] lg:h-[200px] shadow-sm rounded-xl
         p-4 flex flex-col sm:flex-row gap-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950
         cursor-pointer hover:shadow-md transition-all duration-200`}
    >
      <div className="w-full h-full flex flex-col gap-2">
        <div className="w-full  gap-2 flex items-center justify-between">
          <Typography variant="subtitle1" ellipsis lines={1}>
            {project.title}
          </Typography>
          <Badge variant="secondary">
            {getStatusNameByCode(project.status as string)}
          </Badge>
        </div>
        <div className="w-full h-[80px] sm:h-full overflow-auto">
          {project.introduction}
        </div>
        <div className={"w-full flex justify-end"}>
          <Typography variant="caption">
            {formatDateTime(project.created_at, {
              locale: "ko",
              // showRelative: false,
            })}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ProjectDisplayCard;
