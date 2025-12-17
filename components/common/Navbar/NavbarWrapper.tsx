import { createClient } from "@/utils/supabase/server";
import { Navbar } from "./navbar";

/**
 * Navbar 데이터 페칭을 담당하는 서버 컴포넌트
 * Suspense로 감싸서 스트리밍 렌더링 가능하게 함
 */
export async function NavbarWrapper() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profile").select("*").eq("user_id", user.id).single()
    : { data: null };

  const { data: projectList } = profile
    ? await supabase
        .from("project")
        .select("*")
        .eq("owner_profile", profile.id)
        .not("status", "is", null)
        .order("created_at", { ascending: false })
    : { data: null };

  return <Navbar profile={profile} projectList={projectList} />;
}
