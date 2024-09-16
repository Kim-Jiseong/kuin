"use server"
import { TablesUpdate } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const updateProject = async (projectId:string, project: TablesUpdate<"project">) => {
    const supabase = createClient();
    console.log(project);
    const { data, error } = await supabase.from("project")
    .update(project)
    .eq("id", projectId)
    .select();
    revalidatePath("/", "layout");
    return { data, error };
}

export const updateProjectStatus = async (status:string|null, projectId:string) => {
    const supabase = createClient();
    const { data: updatedProject, error } = await supabase
      .from("project")
      .update({
        status: status,
      })
      .eq("id", projectId)
      .select()
      .single();
    revalidatePath("/", "layout");
    return { updatedProject, error };
  };
  
export const deleteProject = async (projectId:string) => {
    const supabase = createClient();
    const { data: updatedProject, error } = await supabase
      .from("project")
      .update({
        status: null,
      })
      .eq("id", projectId)
      .select()
      .single();
    revalidatePath("/", "layout");
    return { updatedProject, error };
  };