import { ModalBody } from "@nextui-org/modal";
import React from "react";
import ProfileCard from "./ProfileCard";
import ExpertProfileCard from "./ExpertProfileCard";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Typography from "../common/Typography";
import { ThemeSwitch } from "../theme-switch";
import { Tables } from "@/types/database.types";

function ProfileMenuContent({
  profile,
  onClose,
}: {
  profile: Tables<"profile"> | null;
  onClose: any;
}) {
  return (
    <ModalBody>
      <ProfileCard profile={profile} onClose={onClose} />
      <ExpertProfileCard profile={profile} onClose={onClose} />
      <Card shadow={"sm"}>
        <CardHeader>일반</CardHeader>
        <Divider />
        <CardBody>
          <div className="flex w-full items-center justify-between">
            <Typography variant={"caption"} style={{ fontWeight: 500 }}>
              테마
            </Typography>
            <ThemeSwitch />
          </div>
        </CardBody>
      </Card>
    </ModalBody>
  );
}

export default ProfileMenuContent;
