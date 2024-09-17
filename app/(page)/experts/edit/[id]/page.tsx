import React from "react";
import ExpertProfileEditModePage from "./components/expertProfileEditModePage";
import { createClient } from "@/utils/supabase/server";
import { getMyProfile } from "../../[id]/action";
import Forbidden from "@/components/common/Forbidden";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

async function ExpertDetailEdit({ params }: Props) {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", params.id)
    .single();
  const myProfile = await getMyProfile();
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      {profile && myProfile?.profile?.id === profile?.id ? (
        <ExpertProfileEditModePage
          expertData={profile.expert_profile}
          profileId={profile.id}
        />
      ) : (
        <Forbidden />
      )}
    </div>
  );
}

export default ExpertDetailEdit;
