import { supabase } from "@/lib/supabaseClient";

export async function getOrCreateUser({
  name,
  email,
  image,
  provider,
}: {
  name: string | undefined | null;
  email: string | undefined | null;
  image: string | undefined | null;
  provider?: string;
}) {
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
  }

  // 4. 유저가 없으면 새 유저 추가
  const { data: newUser, error: insertError } = await supabase
    .from("user")
    .insert([{ name, email, image, provider }])
    .select()
    .single();

  // 5. 에러 발생 시 처리
  if (insertError) {
    throw new Error(`Error creating user: ${insertError.message}`);
  }

  // 6. 새 유저 정보와 isNewUser: true 반환
  return { user: newUser, isNewUser: true };
}
