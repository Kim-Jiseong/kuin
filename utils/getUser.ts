import { supabase } from "@/lib/supabaseClient";

export async function getUser({ email }: { email: string | undefined | null }) {
  // 1. Supabase에서 유저 검색
  const { data: user, error: fetchError } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  // 2. 에러 발생 시 처리
  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error(`Error fetching user: ${fetchError.message}`);
  }

  // 3. 유저가 존재하면 기존 유저 정보와 isNewUser: false 반환
  if (user) {
    return { user, isNewUser: false };
  } else return { user: null, isNewUser: false };
}
