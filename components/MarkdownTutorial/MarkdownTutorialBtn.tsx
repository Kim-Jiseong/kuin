"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MarkdownTutorialModal from "./MarkdownTutorialModal";

function MarkdownTutorialBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="link"
        size="sm"
        className="text-sm"
        onClick={() => setIsOpen(true)}
      >
        마크다운 도움말
      </Button>
      <MarkdownTutorialModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

export default MarkdownTutorialBtn;
