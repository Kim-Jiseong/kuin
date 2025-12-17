"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function OAuthButtons({
  next,
  lastSignedInMethod,
}: {
  next?: string | null;
  lastSignedInMethod?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // 클라이언트 측에서 직접 OAuth 호출 (Server Action 컴파일 대기 없음)
      const supabase = createClient();

      // 현재 origin 기반으로 redirectTo 생성
      const redirectTo = `${window.location.origin}/auth/callback${next ? `?next=${next}` : ""}`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("OAuth error:", error);
        alert("로그인에 실패했습니다.");
        setIsLoading(false);
        return;
      }

      // signInWithOAuth는 자동으로 리다이렉트하므로 별도 처리 불필요
      // 하지만 실패 시를 대비해 로딩 상태 유지
    } catch (error) {
      console.error("OAuth error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        size="lg"
        className="bg-background border-2 border-primary mt-10 shadow-lg text-foreground hover:bg-primary hover:text-white"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        <span>
          {isLoading ? "로그인 중..." : "구글 계정으로 5초만에 시작하기"}
        </span>
      </Button>
    </>
  );
}
