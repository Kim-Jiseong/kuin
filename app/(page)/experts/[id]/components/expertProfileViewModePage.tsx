import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import Typography from "@/components/common/Typography";
import { getMajorObjByCode } from "@/utils/getMajorObjByCode";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Carousel from "@/components/common/Carousel/Carousel";
const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
function ExpertProfileViewModePage({
  userData,
  setEditMode,
  session,
}: {
  userData: any;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
}) {
  return (
    <div className="w-full   flex flex-col justify-center items-center gap-4 py-4">
      <div className="w-full flex flex-col gap-4 items-center md:flex-row">
        {userData?.expert_profile?.portfolio.length > 0 && (
          <Card className="w-full ">
            <CardBody>
              <Carousel
                slides={userData?.expert_profile?.portfolio}
                options={OPTIONS}
              />
            </CardBody>
          </Card>
        )}
        <Card className="w-full ">
          <CardHeader
            // className={`relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300  to-${userData?.expert_profile?.major === "dev" ? "primary" : "danger"}`}
            className={`relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-primary`}
          >
            <Avatar
              size={"lg"}
              isBordered
              src={userData?.expert_profile?.profileImage}
              className="h-20 w-20 translate-y-12 flex-shrink-0"
              radius={"md"}
            />
            {userData?.id === session?.profile.id && (
              <Button
                radius="full"
                size="sm"
                // color={"success"}
                variant="light"
                startContent={<Pencil size={16} />}
                onPress={() => setEditMode(true)}
                className="absolute right-3 top-3 bg-white/20  dark:bg-black/20"
              >
                프로필 수정
              </Button>
            )}
          </CardHeader>
          <CardBody>
            <div className="pb-4 pt-6">
              <Typography variant="subtitle2" ellipsis lines={1}>
                {userData?.expert_profile?.name}
              </Typography>

              <div className="flex gap-2 pt-1 pb-2">
                <Chip
                  size="md"
                  color={returnMajorColor(userData?.expert_profile?.major)}
                >
                  {getMajorObjByCode(userData?.expert_profile?.major)?.name}
                </Chip>
              </div>
              <Typography variant="caption">
                {userData?.expert_profile?.introduction}
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className={"w-full flex flex-col items-center"}>
        <Card fullWidth>
          <CardBody>
            <MarkdownRenderer content={userData?.expert_profile?.detail} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ExpertProfileViewModePage;
