"use server";
// auth error code: https://supabase.com/docs/reference/javascript/auth-error-codes

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
// import { getURL } from "@/utils/helpers";
import { cookies } from "next/headers";
import { getURL } from "@/utils/helpers";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  revalidatePath("/", "layout");
  redirect("/", RedirectType.push);
}

export async function oAuthSignIn(provider: Provider, nextUrl?: string | null) {
  console.log("[oAuthSignIn] called with provider:", provider);
  
  if (!provider) {
    return { error: "문제가 발생했습니다. 다시 시도해주세요." };
  }

  const supabase = await createClient();
  const redirectUrl = getURL("/auth/callback" + (nextUrl ? `?next=${nextUrl}` : ""));
  console.log("[oAuthSignIn] redirectUrl:", redirectUrl);
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  
  console.log("[oAuthSignIn] signInWithOAuth result:", { data, error });
  
  if (error) {
    return { error: "로그인에 실패했습니다." };
  }

  const cookieJar = await cookies();
  cookieJar.set("lastSignedInMethod", provider);

  // 외부 URL은 Server Action에서 redirect() 불가능, URL 반환
  console.log("[oAuthSignIn] returning url:", data.url);
  return { url: data.url };
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
