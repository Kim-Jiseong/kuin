import React from "react";
import Error from "@/app/error";
import ExpertProfileViewModePage from "./components/expertProfileViewModePage";
import { getMyProfile, incrementViewCount } from "./action";
import { ResolvingMetadata } from "next";
import { getExpertProfile } from "@/utils/supabase/cache";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const { id } = await params;
  // React.cache()로 메모이제이션된 함수 사용 - 동일 요청 내 중복 호출 방지
  const { profile } = await getExpertProfile(id);

  if (profile) {
    const expertProfile = profile.expert_profile as any;
    const slides =
      profile &&
      expertProfile?.portfolio &&
      Array.isArray(expertProfile.portfolio) &&
      expertProfile.portfolio.length > 0
        ? expertProfile.portfolio
        : expertProfile?.profileImage
          ? [expertProfile.profileImage as string]
          : [
              "https://flmlczkwdmnqilqdhmxn.supabase.co/storage/v1/object/public/files/source/default_user.webp",
            ];
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: (expertProfile?.name || "전문가") + "님의 프로필 - KUIN",
      description: expertProfile?.introduction,
      openGraph: {
        title: (expertProfile?.name || "전문가") + "님의 프로필 - KUIN",
        description: expertProfile?.introduction,
        images: [...slides, ...previousImages],
      },
    };
  }
}

async function ExpertDetail({ params }: Props) {
  const { id } = await params;
  // 캐시된 함수 사용 - generateMetadata와 동일한 데이터 공유
  const [myProfile, { profile }] = await Promise.all([
    getMyProfile(),
    getExpertProfile(id),
  ]);

  if (myProfile?.profile?.id !== id)
    await incrementViewCount(id, profile?.view);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      {!profile ? (
        <Error />
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-4 ">
          <ExpertProfileViewModePage
            user={myProfile?.user}
            profileId={id}
            expertData={profile?.expert_profile}
            isMe={myProfile?.user?.id === profile?.user_id || false}
          />
        </div>
      )}
    </div>
  );
}

export default ExpertDetail;
