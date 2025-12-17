import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import Typography from "@/components/common/Typography";
import { Badge } from "@/components/ui/badge";
import { getMajorObjByCode } from "@/utils/getMajorObjByCode";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Carousel from "@/components/common/Carousel/Carousel";
import EditBtn from "./EditBtn";
import ContactBtn from "./ContactBtn";
import ShareBtn from "./ShareBtn";
import { Tables } from "@/types/database.types";

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
  isMe: boolean;
}) {
  if (!expertData) return null;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* Mobile Header */}
      <div className="md:hidden mb-8 flex flex-col items-center text-center gap-4">
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
          <AvatarImage
            src={expertData?.profileImage}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl">
            {expertData?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            {expertData?.name}
          </h1>
          <div className="mt-2 flex justify-center gap-2">
            <Badge
              className={`bg-${returnMajorColor(expertData?.major)} text-white`}
            >
              {expertData?.major && getMajorObjByCode(expertData?.major)?.name}
            </Badge>
          </div>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
          {expertData?.introduction}
        </p>
        <div className="flex gap-2 mt-2 w-full justify-center">
          <ContactBtn
            expertData={expertData}
            isLoggedIn={user ? true : false}
          />
          <ShareBtn expertData={expertData} />
          {isMe && <EditBtn profileId={profileId} />}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Content (Left) */}
        <div className="md:col-span-8 flex flex-col gap-12 min-w-0 order-2 md:order-1">
          {/* Section: Portfolio */}
          {expertData?.portfolio &&
            Array.isArray(expertData.portfolio) &&
            expertData.portfolio.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-primary">✦</span> 포트폴리오
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 aspect-square">
                  <Carousel
                    slides={expertData.portfolio as string[]}
                    options={OPTIONS}
                  />
                </div>
              </div>
            )}

          {/* Section: Detail */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-primary">✎</span> 상세 소개
            </h3>
            <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl">
              <MarkdownRenderer content={expertData?.detail} />
            </div>
          </div>
        </div>

        {/* Sidebar (Right) - Desktop Only mostly */}
        <div className="md:col-span-4 lg:col-span-4 relative order-1 md:order-2">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Desktop Profile Card */}
            <div className="hidden md:flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm items-center text-center relative overflow-hidden">
              {/* Decorative background blob */}
              <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <Avatar className="w-32 h-32 border-4 border-white shadow-xl mb-4">
                <AvatarImage
                  src={expertData?.profileImage}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl">
                  {expertData?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {expertData?.name}
              </h1>

              <div className="mt-3 mb-6">
                <Badge
                  className={`hover:opacity-90 px-3 py-1 text-sm ${expertData?.major === "dev" ? "bg-primary" : expertData?.major === "design" ? "bg-red-500" : "bg-gray-500"}`}
                >
                  {expertData?.major &&
                    getMajorObjByCode(expertData?.major)?.name}
                </Badge>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-8 break-keep">
                {expertData?.introduction}
              </p>

              <div className="w-full flex flex-col gap-3">
                <div className="w-full">
                  <ContactBtn
                    expertData={expertData}
                    isLoggedIn={user ? true : false}
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <div className="flex-1">
                    <ShareBtn expertData={expertData} />
                  </div>
                  {isMe && (
                    <div className="flex-1">
                      <EditBtn profileId={profileId} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info Block */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Professional Info
              </h4>
              <div className="space-y-3 text-sm">
                {/* Placeholder for future detailed info like experience, location, etc. */}
                <div className="flex justify-between">
                  <span className="text-gray-500">활동 분야</span>
                  <span className="font-medium">
                    {expertData?.major &&
                      getMajorObjByCode(expertData?.major)?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertProfileViewModePage;
