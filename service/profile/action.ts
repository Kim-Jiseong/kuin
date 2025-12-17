"use server";

import { Tables, TablesUpdate } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";

export type UpdateProfileResult = {
  data: Tables<"profile">[] | null;
  error: PostgrestError | null;
};

export type UpdateProfileStatusResult = {
  updatedProject: Tables<"profile"> | null;
  error: PostgrestError | null;
};

export async function updateProfile(
  profileId: string,
  profile: TablesUpdate<"profile">
): Promise<UpdateProfileResult> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("profile")
    .update(profile)
    .eq("id", profileId)
    .select();
  
  revalidatePath("/", "layout");
  return { data, error };
}

export async function updateProfileStatus(
  status: string,
  projectId: string
): Promise<UpdateProfileStatusResult> {
  const supabase = await createClient();
  
  const { data: updatedProject, error } = await supabase
    .from("profile")
    .update({ status })
    .eq("id", projectId)
    .select()
    .single();
  
  revalidatePath("/", "layout");
  return { updatedProject, error };
}