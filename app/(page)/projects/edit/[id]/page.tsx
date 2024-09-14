import { createClient } from "@/utils/supabase/server";
import React from "react";
import ProjectEditModePage from "./components/projectEditModePage";
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
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      {project && <ProjectEditModePage projectData={project} />}
    </div>
  );
}

export default ProjectEdit;
