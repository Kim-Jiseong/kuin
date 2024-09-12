"use client";
import { Button } from "@nextui-org/button";
import { Check, Contact, Copy, Link, Share, Share2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import Typography from "@/components/common/Typography";
import { Tables } from "@/types/database.types";

function ShareBtn({
  expertData,
}: {
  expertData: Tables<"profile">["expert_profile"] | null | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleShareClick = () => {
    onOpen();
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(process.env.NEXT_PUBLIC_SITE_URL + pathname)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("복사 실패:", err);
      });
  };

  return (
    <div>
      <Button
        color="primary"
        variant={"flat"}
        size="sm"
        radius="full"
        onPress={handleShareClick}
        isIconOnly
      >
        <Share2 size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {expertData?.name}님의 프로필 공유
              </ModalHeader>
              <ModalBody>
                <div className={"flex gap-4"}>
                  <Input
                    readOnly
                    value={process.env.NEXT_PUBLIC_SITE_URL + pathname}
                    startContent={<Link size={18} />}
                    endContent={
                      <Button
                        // variant={"bordered"}
                        color="primary"
                        isIconOnly
                        size="sm"
                        onClick={handleCopyClick}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ShareBtn;
