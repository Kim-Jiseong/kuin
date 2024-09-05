import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Session } from "next-auth";
import React from "react";
import Typography from "../common/Typography";
import NewExpertProfileCard from "../ExpertProfile/NewExpertProfile";
import ExpertProfile from "../ExpertProfile/ExpertProfile";

function ExpertProfileCard({
  session,
  updateSession,
  onClose,
}: {
  session: Session | null;
  updateSession: any;
  onClose: () => void;
}) {
  return (
    <Card>
      <CardHeader>전문가 프로필</CardHeader>
      <CardBody>
        {session?.profile?.expert_profile ? (
          <ExpertProfile
            profile={session?.profile?.expert_profile}
            onClose={onClose}
            myId={session?.profile?.id}
          />
        ) : (
          <NewExpertProfileCard myId={session?.profile?.id} onClose={onClose} />
        )}
      </CardBody>
    </Card>
  );
}

export default ExpertProfileCard;
