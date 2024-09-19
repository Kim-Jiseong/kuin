import { createClient } from "@/utils/supabase/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", params.id)
    .single();
  // Font
  // const pretendardSemiBold = fetch(
  //   new URL("./Pretendard-SemiBold.ttf", import.meta.url)
  // ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontFamily: "Pretendard",
          position: "relative",
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 64,
          flexDirection: "column",
          // justifyContent: "center",
        }}
      >
        <p style={{ color: "#006FEE", fontSize: "1.5rem", margin: 0 }}>
          KUIN Expert
        </p>
        <h2 style={{ margin: 0, fontSize: "4rem", fontWeight: 600 }}>
          {profile?.expert_profile?.name}
        </h2>
        <p>- {profile?.expert_profile?.introduction}</p>
        <span
          style={{
            fontSize: "1.25rem",
            color: "#006FEE",
            position: "absolute",
            bottom: 8,
            right: 16,
            fontWeight: 600,
          }}
        >
          48시간 안에 끝나는 초단기 아웃소싱 플랫폼 - KUIN
        </span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      // fonts: [
      //   {
      //     name: "Pretendard",
      //     data: await pretendardSemiBold,
      //     style: "normal",
      //     weight: 600,
      //   },
      // ],
    }
  );
}
