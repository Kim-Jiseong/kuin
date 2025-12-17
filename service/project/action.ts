"use server";

import { Tables, TablesUpdate } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";

export type UpdateProjectResult = {
  data: Tables<"project">[] | null;
  error: PostgrestError | null;
};

export type UpdateProjectStatusResult = {
  updatedProject: Tables<"project"> | null;
  error: PostgrestError | null;
};

export async function updateProject(
  projectId: string,
  project: TablesUpdate<"project">
): Promise<UpdateProjectResult> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("project")
    .update(project)
    .eq("id", projectId)
    .select();
  
  revalidatePath("/", "layout");
  return { data, error };
}

export async function updateProjectStatus(
  status: string | null,
  projectId: string
): Promise<UpdateProjectStatusResult> {
  const supabase = await createClient();
  
  const { data: updatedProject, error } = await supabase
    .from("project")
    .update({ status })
    .eq("id", projectId)
    .select()
    .single();
  
  revalidatePath("/", "layout");
  return { updatedProject, error };
}

export async function deleteProject(
  projectId: string
): Promise<UpdateProjectStatusResult> {
  const supabase = await createClient();
  
  const { data: updatedProject, error } = await supabase
    .from("project")
    .update({ status: null })
    .eq("id", projectId)
    .select()
    .single();
  
  revalidatePath("/", "layout");
  return { updatedProject, error };
}