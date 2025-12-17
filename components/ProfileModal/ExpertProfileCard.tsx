import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import Typography from "../common/Typography";
import NewExpertProfileCard from "../ExpertProfile/NewExpertProfile";
import ExpertProfile from "../ExpertProfile/ExpertProfile";
import { Tables } from "@/types/database.types";

function ExpertProfileCard({
  profile,
  onClose,
}: {
  profile: Tables<"profile"> | null;
  onClose: () => void;
}) {
  return (
    <Card>
      <CardHeader>전문가 프로필</CardHeader>
      <CardContent>
        {profile?.expert_profile ? (
          <ExpertProfile
            profile={profile}
            expertProfile={profile?.expert_profile}
            onClose={onClose}
          />
        ) : (
          <NewExpertProfileCard myId={profile?.id} onClose={onClose} />
        )}
      </CardContent>
    </Card>
  );
}

export default ExpertProfileCard;
