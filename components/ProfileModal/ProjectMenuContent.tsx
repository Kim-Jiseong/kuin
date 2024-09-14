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
    <ModalBody>
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
          {/* {projectList?.map((project, index) => (
            <div
              key={project.id}
              className="flex w-full items-center justify-between"
            >
              <Typography variant={"text"} ellipsis lines={1}>
                {project.title}
              </Typography>
              <ThemeSwitch />
            </div>
          ))} */}
          <Listbox
            aria-label="Actions"
            onAction={(key) => handleRouting(`/projects/${key}`)}
            items={projectList || []}
          >
            {(project) => (
              <ListboxItem key={project.id}>
                <div className={`w-full flex justify-between items-center`}>
                  <div className={`flex flex-col gap-1`}>
                    <Typography
                      variant={"text"}
                      ellipsis
                      lines={1}
                      style={{ fontWeight: 600 }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant={"caption"}
                      ellipsis={true}
                      lines={2}
                      className={"text-xs"}
                      //   style={{ fontSize: "0.75rem" }}
                    >
                      {project.introduction}
                    </Typography>
                  </div>
                  {/* <Button
                    variant={"flat"}
                    color={"success"}
                    size="sm"
                    //   startContent={<BookUser size={16} />}
                    onPress={() => handleRouting(`/projects/${project.id}`)}
                  >
                    자세히
                  </Button> */}
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </CardBody>
      </Card>
    </ModalBody>
  );
}

export default ProjectMenuContent;
