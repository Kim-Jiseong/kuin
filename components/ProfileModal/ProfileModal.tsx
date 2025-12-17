"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Typography from "../common/Typography";
import { ThemeSwitch } from "../theme-switch";
import ProfileCard from "./ProfileCard";
import ExpertProfileCard from "./ExpertProfileCard";
import { Tables } from "@/types/database.types";
import { useRouter } from "next/navigation";
import ProfileMenuContent from "./ProfileMenuContent";
import ProjectMenuContent from "./ProjectMenuContent";
function ProfileModal({
  isOpen,
  onOpenChange,
  profile,
  projectList,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Tables<"profile"> | null;
  projectList: Tables<"project">[] | null;
}) {
  const [selectedMenu, setSelectedMenu] = useState("settings");

  // text-${selectedMenu === "settings" ? "text" : "content2-foreground"}

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const id = event.currentTarget.id;
    setSelectedMenu(id);
  };

  const switchMenu = (onClose: any) => {
    switch (selectedMenu) {
      case "settings":
        return <ProfileMenuContent profile={profile} onClose={onClose} />;
      case "projects":
        return (
          <ProjectMenuContent projectList={projectList} onClose={onClose} />
        );

      case "profile":
        return "text-profile";
      case "help":
        return "text-help";
      default:
        return "content4";
    }
  };
  const switchMenuStyle = (id: string) => {
    if (selectedMenu === id) {
      return "font-bold text-foreground";
    } else {
      return "font-normal text-content4-foreground";
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2 h-5">
            <span
              role="button"
              id="settings"
              onClick={handleClick}
              className={`cursor-pointer transition-all duration-200 ${switchMenuStyle("settings")}`}
            >
              설정
            </span>
            <Separator orientation={"vertical"} />
            <span
              role="button"
              id="projects"
              onClick={handleClick}
              className={`cursor-pointer transition-all duration-200 ${switchMenuStyle("projects")}`}
            >
              내 프로젝트
            </span>
          </div>
        </DialogHeader>
        {switchMenu(() => onOpenChange(false))}
      </DialogContent>
    </Dialog>
  );
}

export default ProfileModal;
