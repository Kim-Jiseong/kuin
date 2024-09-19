import React, { Suspense } from "react";
import { getMyProfile, incrementViewCount } from "./action";
import { Spinner } from "@nextui-org/react";
import Error from "@/app/error";
import ProjectViewModePage from "./components/ProjectViewModePage";
import { createClient } from "@/utils/supabase/server";
import { ResolvingMetadata } from "next";
type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const supabase = createClient();
  const { data: project, error: projectError } = await supabase
    .from("project")
    .select(
      `
    *,
    owner_profile:profile (
      id,
      name,
      email,
      image,
      provider,
      user_id,
      view,
      expert_profile,
      created_at
    )
  `
    )
    .eq("id", params.id)
    .single();
  if (project) {
    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [];

    return {
      title: project.title + " - KUIN",
      description: project.introduction,
      url: process.env.NEXT_PUBLIC_SITE_URL + "/projects/" + params.id,
      openGraph: {
        title: project.title + " - KUIN",
        description: project.introduction,
        // images: [...previousImages],
      },
    };
  }
}

async function ProjectDetail({ params }: Props) {
  const myProfile = await getMyProfile();
  const supabase = createClient();
  const { data: project, error: projectError } = await supabase
    .from("project")
    .select(
      `
    *,
    owner_profile:profile (
      id,
      name,
      email,
      image,
      provider,
      user_id,
      view,
      expert_profile,
      created_at
    )
  `
    )
    .eq("id", params.id)
    .single();

  if (myProfile?.profile?.id !== project?.owner_profile?.id)
    await incrementViewCount(params.id, project?.view);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      {/* <Suspense
        fallback={
          <div
            className={
              "w-full h-[50vh] flex flex-col items-center justify-center"
            }
          >
            <Spinner />
          </div>
        }
      > */}
      {!project ? (
        <Error />
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-4 ">
          <ProjectViewModePage
            user={myProfile?.user}
            projectId={params.id}
            projectData={project}
            isMe={
              myProfile?.profile?.id === project?.owner_profile?.id || false
            }
          />
        </div>
      )}
      {/* </Suspense> */}
    </div>
  );
}

export default ProjectDetail;
