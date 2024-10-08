import React from "react";
import { ThemeSwitch } from "../theme-switch";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Listbox,
  ListboxItem,
  ModalBody,
} from "@nextui-org/react";
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
    <ModalBody className="max-h-[70vh]">
      <Card shadow={"sm"}>
        <CardHeader>
          <div className={"flex w-full items-center justify-between"}>
            <Typography variant="text" style={{ fontWeight: 700 }}>
              프로젝트 관리
            </Typography>
            <Button
              size="sm"
              color="primary"
              variant={"flat"}
              onPress={() => handleRouting("/projects/new")}
            >
              + 새 프로젝트
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {/* <Listbox
            aria-label="Actions"
            onAction={(key) => handleRouting(`/projects/${key}`)}
            items={projectList || []}
          >
            {(project) => (
              <ProjectContentRow key={project.id} project={project} />
            )}
          </Listbox> */}
          <div className={`flex flex-col w-full gap-2`}>
            {projectList && projectList.length > 0 ? (
              projectList?.map((project, index) => (
                <div key={project.id}>
                  <ProjectContentRow
                    project={project}
                    handleRouting={handleRouting}
                  />
                  <Divider />
                </div>
              ))
            ) : (
              <Typography variant="text">
                새 프로젝트를 만들어보세요!
              </Typography>
            )}
          </div>
        </CardBody>
      </Card>
    </ModalBody>
  );
}

export default ProjectMenuContent;
