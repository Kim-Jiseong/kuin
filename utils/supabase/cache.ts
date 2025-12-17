import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

/**
 * React.cache()를 활용한 요청 레벨 메모이제이션
 * 동일 렌더 사이클 내에서 중복 Supabase 호출 방지
 * generateMetadata와 페이지 컴포넌트에서 동일한 데이터를 공유
 */

// 현재 사용자 정보 가져오기 (캐시됨)
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

// 현재 사용자의 프로필 가져오기 (캐시됨)
export const getCurrentProfile = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return profile;
});

// 프로젝트 조회 (캐시됨)
export const getProject = cache(async (projectId: string) => {
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("project")
    .select(
      `
      *,
      owner_profile:profile (
        id,
        name,
        email,
        image,
        provider,
        user_id,
        view,
        expert_profile,
        created_at
      )
    `
    )
    .eq("id", projectId)
    .single();

  return { project, error };
});

// 전문가 프로필 조회 (캐시됨)
export const getExpertProfile = cache(async (profileId: string) => {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", profileId)
    .single();

  return { profile, error };
});
