import Typography from "@/components/common/Typography";
import { Tables } from "@/types/database.types";
import { getStatusNameByCode } from "@/utils/getStatusNameByCode";
import { returnStatusColor } from "@/utils/returnStatusColor";
import { Chip, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

function ProjectDisplayCard({ project }: { project: Tables<"project"> }) {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => router.push(`/projects/${project.id}`)}
      className={`w-full lg:w-[calc(50%_-_0.5rem)] 
        h-[auto] lg:h-[200px] shadow-md rounded-large
         p-4 flex flex-col sm:flex-row gap-3 border-1 border-divider 
         cursor-pointer hover:bg-content2 transition-all duration-200`}
    >
      <div className="w-full h-full flex flex-col gap-2">
        <div className="w-full  gap-2 flex items-center justify-between">
          <Typography variant="subtitle1">{project.title}</Typography>
          <Chip size="sm" color={returnStatusColor(project.status as string)}>
            {getStatusNameByCode(project.status as string)}
          </Chip>
        </div>
        <ScrollShadow className={"w-full h-[80px] sm:h-full overflow-auto"}>
          {project.introduction}
        </ScrollShadow>
      </div>
    </div>
  );
}

export default ProjectDisplayCard;
