"use client";
import Typography from "@/components/common/Typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Contact } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const handleContactClick = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        className="rounded-full"
        onClick={handleContactClick}
      >
        <Contact size={18} className="mr-2" />
        연락처 보기
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-1">
            {owner_profile.name} 님의 연락처
          </DialogHeader>
          <div>
            {isLoggedIn ? (
              <Typography variant={"subtitle2"} color={"primary"}>
                {status === "open"
                  ? contact
                  : "모집 중인 프로젝트에서만 연락처를 확인하실 수 있습니다"}
              </Typography>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <Typography variant={"subtitle2"} color={"primary"}>
                  로그인하고 {owner_profile.name} 님의 연락처를 확인해보세요
                </Typography>
                <Button
                  className="rounded-full"
                  onClick={() => {
                    const next = pathname ? `?next=${pathname}` : "";
                    router.push("/auth" + next);
                  }}
                >
                  로그인
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ContactBtn;
