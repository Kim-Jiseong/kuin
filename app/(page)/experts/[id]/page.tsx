import React, { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import Error from "@/app/error";
import ExpertProfileViewModePage from "./components/expertProfileViewModePage";
import { getMyProfile, incrementViewCount } from "./action";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", params.id)
    .single();
  if (profile) {
    const slides =
      profile &&
      profile.expert_profile?.portfolio &&
      profile.expert_profile?.portfolio.length > 0
        ? profile.expert_profile.portfolio
        : profile.expert_profile?.profileImage
          ? Array(profile.expert_profile?.profileImage as string)
          : [
              "https://flmlczkwdmnqilqdhmxn.supabase.co/storage/v1/object/public/files/source/default_user.webp",
            ];
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: profile?.expert_profile?.name + "님의 프로필 - KUIN",
      description: profile?.expert_profile?.introduction,
      openGraph: {
        title: profile?.expert_profile?.name + "님의 프로필 - KUIN",
        description: profile?.expert_profile?.introduction,
        images: [...slides, ...previousImages],
      },
    };
  }
}

async function ExpertDetail({ params }: Props) {
  const supabase = createClient();

  const myProfile = await getMyProfile();

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", params.id);

  if (myProfile?.profile?.id !== params.id)
    await incrementViewCount(params.id, profile?.[0]?.view);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      <Suspense
        fallback={
          <div
            className={
              "w-full h-[50vh] flex flex-col items-center justify-center"
            }
          >
            <Spinner />
          </div>
        }
      >
        {profile &&
          (profile?.length === 0 ? (
            <Error />
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-4 ">
              {/* <ContentContainer user={user} profile={profile} /> */}
              <ExpertProfileViewModePage
                user={myProfile?.user}
                profileId={params.id}
                expertData={profile[0]?.expert_profile}
                isMe={myProfile?.user?.id === profile?.[0]?.user_id || false}
              />
            </div>
          ))}
      </Suspense>
    </div>
  );
}

export default ExpertDetail;
