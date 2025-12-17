"use client";
import { Button } from "@/components/ui/button";
import { Contact } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const handleContactClick = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full bg-white/20 dark:bg-black/20 border-border border"
        onClick={handleContactClick}
      >
        <Contact size={18} className="mr-2" />
        연락처 보기
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle>{expertData?.name}님의 연락처</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            {isLoggedIn ? (
              <Typography variant={"subtitle2"} color={"primary"}>
                {expertData?.contact}
              </Typography>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <Typography variant={"subtitle2"} color={"primary"}>
                  로그인하고 {expertData?.name}님의 연락처를 확인해보세요
                </Typography>
                <Button
                  className="rounded-full border-border border"
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
