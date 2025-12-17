"use client";

import { Provider } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";
import { oAuthSignIn } from "./login/action";
import Typography from "@/components/common/Typography";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
      const result = await oAuthSignIn("google", next);
      console.log("OAuth result:", result);
      if ("error" in result && result.error) {
        alert(result.error);
        setIsLoading(false);
        return;
      }
      if ("url" in result && result.url) {
        // 외부 URL로 리다이렉트
        window.location.href = result.url;
      }
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
        className="bg-background border-2 border-primary mt-10 shadow-lg"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        <Typography variant="text" style={{ fontWeight: 700 }}>
          {isLoading ? "로그인 중..." : "구글 계정으로 5초만에 시작하기"}
        </Typography>
      </Button>
    </>
  );
}
