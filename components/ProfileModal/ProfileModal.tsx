"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Typography from "../common/Typography";
import { ThemeSwitch } from "../theme-switch";
import { LogOut, Pencil } from "lucide-react";
import ProfileCard from "./ProfileCard";
function ProfileModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">설정</ModalHeader>
            <ModalBody>
              <ProfileCard />
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
