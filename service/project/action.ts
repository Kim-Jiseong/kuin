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