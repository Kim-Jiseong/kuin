"use client";
import { Button } from "@nextui-org/button";
import { Contact } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import Typography from "@/components/common/Typography";

function ContactBtn({
  expertData,
  isLoggedIn,
}: {
  expertData: any;
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
        variant="light"
        size="sm"
        radius="full"
        className=" bg-white/20  dark:bg-black/20"
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
                {expertData?.name}님의 연락처
              </ModalHeader>
              <ModalBody>
                {isLoggedIn ? (
                  <Typography variant={"subtitle2"} color={"primary"}>
                    {expertData?.contact}
                  </Typography>
                ) : (
                  <div
                    className={
                      "flex flex-col items-center justify-center gap-4"
                    }
                  >
                    <Typography variant={"subtitle2"} color={"primary"}>
                      로그인하고 {expertData?.name}님의 연락처를 확인해보세요
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
    </div>
  );
}

export default ContactBtn;
