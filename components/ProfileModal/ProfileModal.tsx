"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import Typography from "../common/Typography";
import { ThemeSwitch } from "../theme-switch";
import ProfileCard from "./ProfileCard";
import ExpertProfileCard from "./ExpertProfileCard";
import { Tables } from "@/types/database.types";
function ProfileModal({
  isOpen,
  onOpenChange,
  profile,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Tables<"profile"> | null;
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
      case "projects":
        return (
          <ModalBody>
            <Card shadow={"sm"}>
              <CardHeader>
                <div className={"flex w-full items-center justify-between"}>
                  <Typography variant="text" style={{ fontWeight: 700 }}>
                    프로젝트 관리
                  </Typography>
                  <Button size="sm" color="primary" variant={"flat"}>
                    + 새 프로젝트
                  </Button>
                </div>
              </CardHeader>
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
      case "profile":
        return "text-profile";
      case "help":
        return "text-help";
      default:
        return "content4";
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex gap-2">
                <span
                  role="button"
                  id="settings"
                  onClick={handleClick}
                  className={`cursor-pointer 
                    transition-all duration-200
 text-${selectedMenu === "settings" ? "text" : "content4"}
                    `}
                >
                  설정
                </span>
                <span
                  role="button"
                  id="projects"
                  onClick={handleClick}
                  className={`cursor-pointer
 transition-all duration-200 
 text-${selectedMenu === "projects" ? "text" : "content4"}`}
                >
                  내 프로젝트
                </span>
              </div>
            </ModalHeader>
            {switchMenu(onClose)}
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ProfileModal;
