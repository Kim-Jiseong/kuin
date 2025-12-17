import { Tables } from "@/types/database.types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* Header Mobile Only - visible on small screens */}
      <div className="md:hidden mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className={`text-white hover:bg-opacity-90 transition-colors ${projectData.status === "open" ? "bg-orange-500" : projectData.status === "ongoing" ? "bg-blue-500" : projectData.status === "done" ? "bg-green-500" : "bg-gray-500"}`}
          >
            {getStatusNameByCode(projectData.status as string)}
          </Badge>
          <span className="text-sm text-gray-400">
            {new Date(projectData.created_at).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-gray-50">
          {projectData.title}
        </h1>
        <p className="text-gray-500">{projectData.introduction}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Content (Left) */}
        <div className="md:col-span-8 flex flex-col gap-8 md:gap-12 min-w-0">
          {/* Header Desktop - visible on medium+ screens */}
          <div className="hidden md:flex flex-col gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="flex items-center gap-3">
              <Badge
                className={`px-3 py-1 text-sm font-medium text-white hover:opacity-90 ${projectData.status === "open" ? "bg-orange-500" : projectData.status === "ongoing" ? "bg-blue-500" : projectData.status === "done" ? "bg-green-500" : "bg-gray-500"}`}
              >
                {getStatusNameByCode(projectData.status as string)}
              </Badge>
              <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-700 mx-1" />
              <span className="text-sm text-gray-500 font-medium">
                조회수 {projectData.view ?? 0}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 break-keep">
              {projectData.title}
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              {projectData.introduction}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl">
            <MarkdownRenderer content={projectData.detail} />
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-paperclip"
              >
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              첨부파일
            </h3>
            <FileViewContainer fileList={projectData.files as any} />
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="md:col-span-4 lg:col-span-4 relative">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Project Owner
                </span>
                <OwnerCard
                  projectData={projectData}
                  ownerProfile={projectData.owner_profile}
                  user={user}
                  isMe={isMe}
                />
              </div>

              <div className="w-full h-[1px] bg-gray-100 dark:bg-gray-800" />

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">등록일</span>
                  <span className="font-medium">
                    {new Date(projectData.created_at).toLocaleDateString()}
                  </span>
                </div>
                {/* Add more metadata here if available in the future (e.g. Budget, Period) */}
              </div>
            </div>

            {/* Additional Interaction/Info Area if needed */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-sm text-gray-500 leading-relaxed text-center">
              프로젝트에 대해 궁금한 점이 있다면
              <br />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                위 버튼을 눌러 담당자에게 문의해보세요.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectViewModePage;
