import React from "react";
import { ThemeSwitch } from "../theme-switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Typography from "../common/Typography";
import { useRouter } from "next/navigation";
import { Tables } from "@/types/database.types";
import ProjectContentRow from "./ProjectContentRow";

function ProjectMenuContent({
  projectList,
  onClose,
}: {
  projectList: Tables<"project">[] | null;
  onClose: any;
}) {
  const router = useRouter();
  const handleRouting = (url: string) => {
    router.push(url);
    onClose();
  };
  return (
    <div className="max-h-[70vh]">
      <div className="w-full h-full flex flex-col gap-4">
        <div className={"flex w-full items-center justify-between px-1"}>
          <Typography variant="text" style={{ fontWeight: 700 }}>
            프로젝트 관리
          </Typography>
          <Button
            size="sm"
            color="primary"
            variant="secondary"
            onClick={() => handleRouting("/projects/new")}
          >
            + 새 프로젝트
          </Button>
        </div>
        <div className={`flex flex-col w-full gap-2`}>
          {projectList && projectList.length > 0 ? (
            projectList?.map((project, index) => (
              <ProjectContentRow
                key={project.id}
                project={project}
                handleRouting={handleRouting}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Typography variant="text">
                새 프로젝트를 만들어보세요!
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectMenuContent;
