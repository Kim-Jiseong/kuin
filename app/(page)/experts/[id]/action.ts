"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const getProfileWithUser = async () => {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if(user){
        const { data: profile, error: profileError } = await supabase.from("profile").select("*").eq("user_id", user.id)
    }

}

export async function incrementViewCount(profileId: string) {
  const supabase = createClient();
  // 1. 기존의 view 값을 가져옴
  const { data: profile, error: fetchError } = await supabase
    .from('profile')
    .select('view')
    .eq('id', profileId)
    .single();

  if (fetchError) {
    console.error('Error fetching view count:', fetchError);
    return null;
  }

  const currentViewCount = profile?.view ?? 0; // view 값이 없으면 0으로 처리

  // 2. view 값을 1 증가시켜 업데이트
  const { data, error } = await supabase
    .from('profile')
    .update({ view: currentViewCount + 1 })
    .eq('id', profileId);

  if (error) {
    console.error('Error incrementing view count:', error);
    return null;
  }

  return data;
}
