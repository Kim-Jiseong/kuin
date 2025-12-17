"use server";
import { createClient } from "@/utils/supabase/server";

export const getMyProfile = async () => {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if(user){
        const { data: profile, error: profileError } = await supabase.from("profile").select("*").eq("user_id", user.id)
        return { user: user, profile: profile?.[0] }
      }
      return null
    }

    
export async function incrementViewCount(projectId: string, prevView: number | undefined) {
  const supabase = await createClient();

  const currentViewCount = prevView ?? 0;

  // view 값을 1 증가시켜 업데이트
  const { data, error } = await supabase
    .from("project")
    .update({ view: currentViewCount + 1 })
    .eq("id", projectId);

  if (error) {
    console.error('Error incrementing view count:', error);
    return null;
  }

  return data;
}
