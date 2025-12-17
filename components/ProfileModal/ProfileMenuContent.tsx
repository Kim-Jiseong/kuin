import React from "react";
import ProfileCard from "./ProfileCard";
import ExpertProfileCard from "./ExpertProfileCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <div>
      <ProfileCard profile={profile} onClose={onClose} />
      <ExpertProfileCard profile={profile} onClose={onClose} />
      <Card>
        <CardHeader>일반</CardHeader>
        <Separator />
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <Typography variant={"caption"} style={{ fontWeight: 500 }}>
              테마
            </Typography>
            <ThemeSwitch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileMenuContent;
