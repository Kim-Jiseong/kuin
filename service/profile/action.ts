"use server"
import { TablesUpdate } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const updateProfile = async (profileId:string, profile: TablesUpdate<"profile">) => {
    const supabase = createClient();
    console.log(profile);
    const { data, error } = await supabase.from("profile")
    .update(profile)
    .eq("id", profileId)
    .select();
    revalidatePath("/", "layout");
    return { data, error };
}

export const updateProfileStatus = async (status:string, projectId:string) => {
    const supabase = createClient();
    const { data: updatedProject, error } = await supabase
      .from("profile")
      .update({
        status: status,
      })
      .eq("id", projectId)
      .select()
      .single();
    revalidatePath("/", "layout");
    return { updatedProject, error };
  };