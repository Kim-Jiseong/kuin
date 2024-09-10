import Typography from "@/components/common/Typography";
import { Tables } from "@/types/database.types";
import { getMajorObjByCode } from "@/utils/getMajorObjByCode";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
import React from "react";

function ExpertProfileDisplayCard({ profile }: { profile: Tables<"profile"> }) {
  if (!profile.expert_profile) return null;
  return (
    <Card className="py-4 w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
        <h4 className="font-bold text-large">
          {profile.expert_profile.name}{" "}
          <Chip
            size="sm"
            color={returnMajorColor(profile.expert_profile.major)}
          >
            {getMajorObjByCode(profile.expert_profile.major)?.name}
          </Chip>
        </h4>
        <Typography variant="text" ellipsis lines={4} className={"w-full"}>
          {profile.expert_profile.introduction}
        </Typography>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          isZoomed
          isBlurred
          width={270}
          height={270}
          alt="Portfolio Thumbnail Image"
          className="w-full object-cover rounded-xl"
          src={
            profile.expert_profile?.portfolio.length > 0
              ? profile.expert_profile.portfolio[0]
              : profile.expert_profile.profileImage
          }
        />
      </CardBody>
    </Card>
  );
}

export default ExpertProfileDisplayCard;
