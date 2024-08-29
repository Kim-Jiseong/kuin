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
function ProfileModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">설정</ModalHeader>
            <ModalBody>
              <Card>
                <CardHeader>프로필</CardHeader>
                <CardBody>
                  {!session ? (
                    <div className="w-full flex justify-between items-center gap-2">
                      <div
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => router.push("/auth")}
                      >
                        <Avatar isBordered />
                        <div className="flex flex-col gap-1">
                          <Typography variant="caption">
                            Sign In here
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar
                          isBordered
                          src={session.profile?.image as string}
                          className="flex-shrink-0"
                        />
                        <div className="flex flex-col gap-1">
                          <Typography variant="text" ellipsis lines={1}>
                            {session.profile?.name}
                          </Typography>
                          <Typography variant="caption" ellipsis lines={1}>
                            {session.profile?.email}
                          </Typography>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        // startContent={<LogOut size={16} />}
                        onPress={() => signOut()}
                      >
                        로그아웃
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
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
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ProfileModal;
