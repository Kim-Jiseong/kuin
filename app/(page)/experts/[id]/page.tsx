import React, { Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import Error from "@/app/error";
import ExpertProfileViewModePage from "./components/expertProfileViewModePage";
type Props = {
  params: {
    id: string;
  };
};

async function ExpertDetail({ params }: Props) {
  // console.log(params.id);
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", params.id);
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
                profileId={params.id}
                expertData={profile[0]?.expert_profile}
                isMe={user?.id === profile?.[0]?.user_id || false}
              />
            </div>
          ))}
      </Suspense>
    </div>
  );
}

export default ExpertDetail;
