import { createClient } from "@/utils/supabase/server";
import React from "react";
import ProjectEditModePage from "./components/projectEditModePage";
import { getMyProfile } from "../../action";
import Forbidden from "@/components/common/Forbidden";
type Props = {
  params: {
    id: string;
  };
};
async function ProjectEdit({ params }: Props) {
  const supabase = createClient();
  const { data: project, error: projectError } = await supabase
    .from("project")
    .select("*")
    .eq("id", params.id)
    .single();

  const myProfile = await getMyProfile();
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      {project && project.owner_profile === myProfile?.profile?.id ? (
        <ProjectEditModePage projectData={project} />
      ) : (
        <Forbidden />
      )}
    </div>
  );
}

export default ProjectEdit;
