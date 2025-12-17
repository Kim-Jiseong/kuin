import React from "react";
import { getMyProfile, incrementViewCount } from "./action";
import Error from "@/app/error";
import ProjectViewModePage from "./components/ProjectViewModePage";
import { ResolvingMetadata } from "next";
import { getStatusNameByCode } from "@/utils/getStatusNameByCode";
import { getProject } from "@/utils/supabase/cache";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const { id } = await params;
  // React.cache()로 메모이제이션된 함수 사용 - 동일 요청 내 중복 호출 방지
  const { project } = await getProject(id);

  if (project) {
    return {
      title: project.title + " - KUIN",
      description: project.introduction,
      url: process.env.NEXT_PUBLIC_SITE_URL + "/projects/" + id,
      openGraph: {
        title: project.title + " - KUIN",
        description:
          `[${getStatusNameByCode(project.status)}] ` + project.introduction,
      },
    };
  }
}

async function ProjectDetail({ params }: Props) {
  const { id } = await params;
  // 캐시된 함수 사용 - generateMetadata와 동일한 데이터 공유
  const [myProfile, { project }] = await Promise.all([
    getMyProfile(),
    getProject(id),
  ]);

  if (myProfile?.profile?.id !== project?.owner_profile?.id)
    await incrementViewCount(id, project?.view ?? undefined);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      {!project ? (
        <Error />
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-4 ">
          <ProjectViewModePage
            user={myProfile?.user}
            projectId={id}
            projectData={project}
            isMe={
              myProfile?.profile?.id === project?.owner_profile?.id || false
            }
          />
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
