"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

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
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">설정</ModalHeader>
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
            <ModalFooter>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ProfileModal;
