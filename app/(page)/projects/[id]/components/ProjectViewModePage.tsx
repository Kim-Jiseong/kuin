import { Tables } from "@/types/database.types";
import { Avatar, User } from "@nextui-org/react";
import React from "react";
import OwnerCard from "./OwnerCard";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";

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
  // console.log(projectData);
  return (
    <div className="w-full flex flex-col justify-center gap-4 py-4">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{projectData?.title}</h1>
        <p className="text-sm text-gray-500">{projectData?.introduction}</p>
      </div>
      <OwnerCard owner_profile={projectData?.owner_profile} />
      <div className={"w-full flex flex-col items-center"}>
        <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large w-full transition-transform-background motion-reduce:transition-none">
          <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
            <MarkdownRenderer content={projectData?.detail} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectViewModePage;
