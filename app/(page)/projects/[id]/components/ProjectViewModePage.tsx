import { Tables } from "@/types/database.types";
import { Avatar, Chip, User } from "@nextui-org/react";
import React from "react";
import OwnerCard from "./OwnerCard";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import { returnStatusColor } from "@/utils/returnStatusColor";
import { getStatusNameByCode } from "@/utils/getStatusNameByCode";
import FileViewContainer from "./FileViewContainer";

function ProjectViewModePage({
  user,
  projectId,
  projectData,
  isMe,
}: {
  user: any;
  projectId: string;
  projectData: Tables<"project"> | undefined;
  isMe: boolean;
}) {
  if (!projectData) return null;
  // console.log(projectData);
  else
    return (
      <div className="w-full flex flex-col justify-center gap-4 py-4">
        <div className="w-full flex flex-col gap-0">
          <div className="text-2xl font-bold inline-flex items-center gap-2 flex-wrap">
            <div
              className={`relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-xs rounded-full bg-${returnStatusColor(projectData.status as string)} text-primary-foreground`}
            >
              <span className="flex-1 text-inherit font-normal px-2">
                {getStatusNameByCode(projectData.status as string)}
              </span>
            </div>
            <span className="break-words">{projectData.title}</span>
          </div>
          <p className="text-sm text-gray-500">{projectData.introduction}</p>
        </div>
        <OwnerCard
          owner_profile={projectData.owner_profile}
          created_at={projectData.created_at}
          contact={projectData.contact}
          status={projectData.status}
          user={user}
        />
        <div className={"w-full flex flex-col"}>
          {/* <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large w-full transition-transform-background motion-reduce:transition-none">
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased"> */}
          <MarkdownRenderer content={projectData.detail} />
          {/* </div>
        </div> */}
        </div>
        <FileViewContainer fileList={projectData.files} />
      </div>
    );
}

export default ProjectViewModePage;
