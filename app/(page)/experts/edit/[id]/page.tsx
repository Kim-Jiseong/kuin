import React from "react";
import ExpertProfileEditModePage from "./components/expertProfileEditModePage";
import { createClient } from "@/utils/supabase/server";

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
    .eq("id", params.id);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      {profile && (
        <ExpertProfileEditModePage
          expertData={profile[0]?.expert_profile}
          profileId={profile[0]?.id}
        />
      )}
    </div>
  );
}

export default ExpertDetailEdit;
