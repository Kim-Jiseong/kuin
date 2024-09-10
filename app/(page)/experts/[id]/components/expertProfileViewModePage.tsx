import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import Typography from "@/components/common/Typography";
import { getMajorObjByCode } from "@/utils/getMajorObjByCode";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Avatar } from "@nextui-org/avatar";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Carousel from "@/components/common/Carousel/Carousel";
import EditBtn from "./EditBtn";
import ContactBtn from "./ContactBtn";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/database.types";
import { incrementViewCount } from "../action";

const OPTIONS: EmblaOptionsType = {};

function ExpertProfileViewModePage({
  user,
  profileId,
  expertData,
  isMe,
}: {
  user: any;
  profileId: string;
  expertData: any;
  // expertData: Tables<"profile">["expert_profile"] | undefined;
  isMe: boolean;
}) {
  return (
    <div className="w-full  flex flex-col justify-center items-center gap-4 py-4">
      <div className="w-full gap-4 flex flex-col items-center md:flex-row relative">
        {expertData?.portfolio.length > 0 && (
          <div className="relative flex flex-col overflow-hidden text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large w-full transition-transform-background motion-reduce:transition-none h-full flex-1 aspect-square">
            <Carousel slides={expertData?.portfolio} options={OPTIONS} />
          </div>
        )}
        <div className="flex flex-col relative overflow-hidden text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large w-full transition-transform-background motion-reduce:transition-none h-full flex-1 aspect-square">
          <div className="p-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-primary">
            <Avatar
              size={"lg"}
              isBordered
              src={expertData?.profileImage}
              className="h-20 w-20 translate-y-12 flex-shrink-0"
              radius={"md"}
            />
            <div className={" flex gap-2 absolute top-3 right-3"}>
              <ContactBtn
                expertData={expertData}
                isLoggedIn={user ? true : false}
              />
              {isMe && <EditBtn profileId={profileId} />}
            </div>
          </div>
          <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased pb-4 pt-6">
            <div>
              <Typography variant="subtitle2" ellipsis lines={1}>
                {expertData?.name}
              </Typography>
              <div className="flex gap-2 pt-1 pb-2">
                <div
                  className={`relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-7 text-small rounded-full bg-${returnMajorColor(expertData?.major)} text-primary-foreground`}
                >
                  <span className="flex-1 text-inherit font-normal px-2">
                    {getMajorObjByCode(expertData?.major)?.name}
                  </span>
                </div>
              </div>

              <Typography variant="caption">
                {expertData?.introduction}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={"w-full flex flex-col items-center"}>
        <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large w-full transition-transform-background motion-reduce:transition-none">
          <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
            <MarkdownRenderer content={expertData?.detail} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertProfileViewModePage;
