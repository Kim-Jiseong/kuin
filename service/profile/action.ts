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