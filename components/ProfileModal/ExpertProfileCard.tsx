import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Session } from "next-auth";
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
      <CardBody>
        {profile?.expert_profile ? (
          <ExpertProfile
            profile={profile?.expert_profile}
            onClose={onClose}
            myId={profile?.id}
          />
        ) : (
          <NewExpertProfileCard myId={profile?.id} onClose={onClose} />
        )}
      </CardBody>
    </Card>
  );
}

export default ExpertProfileCard;
