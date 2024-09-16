"use client";
import Typography from "@/components/common/Typography";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Contact } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function ContactBtn({
  status,
  contact,
  owner_profile,
  isLoggedIn,
}: {
  status: string | null;
  contact: string | null;
  owner_profile: any;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleContactClick = () => {
    onOpen();
  };
  return (
    <div>
      <Button
        color="primary"
        variant={"flat"}
        size="sm"
        radius="full"
        // className=" bg-white/20  dark:bg-black/20"
        startContent={<Contact size={18} />}
        onPress={handleContactClick}
      >
        연락처 보기
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {owner_profile.name} 님의 연락처
              </ModalHeader>
              <ModalBody>
                {isLoggedIn ? (
                  <Typography variant={"subtitle2"} color={"primary"}>
                    {status === "open"
                      ? contact
                      : "모집 중인 프로젝트에서만 연락처를 확인하실 수 있습니다"}
                  </Typography>
                ) : (
                  <div
                    className={
                      "flex flex-col items-center justify-center gap-4"
                    }
                  >
                    <Typography variant={"subtitle2"} color={"primary"}>
                      로그인하고 {owner_profile.name} 님의 연락처를 확인해보세요
                    </Typography>
                    <Button
                      radius="full"
                      color="primary"
                      onPress={() => {
                        const next = pathname ? `?next=${pathname}` : "";
                        router.push("/auth" + next);
                      }}
                    >
                      <Typography variant={"text"} className={"font-semibold"}>
                        로그인
                      </Typography>
                    </Button>
                  </div>
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ContactBtn;
