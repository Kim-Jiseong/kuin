"use client";
import { Button } from "@/components/ui/button";
import { Check, Contact, Copy, Link, Share, Share2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Typography from "@/components/common/Typography";
import { Tables } from "@/types/database.types";

function ShareBtn({ expertData }: { expertData: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleShareClick = () => {
    setIsOpen(true);
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
        variant="ghost"
        size="sm"
        className="rounded-full bg-white/20 dark:bg-black/20 border-border border"
        onClick={handleShareClick}
      >
        <Share2 size={20} /> 프로필 공유
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle>{expertData?.name}님의 프로필 공유</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <div className="flex gap-2">
              <Input
                readOnly
                value={process.env.NEXT_PUBLIC_SITE_URL + pathname}
                className="flex-1"
              />
              <Button
                className="border-border border"
                size="icon"
                onClick={handleCopyClick}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ShareBtn;
