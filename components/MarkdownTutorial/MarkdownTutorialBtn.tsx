"use client";
import { Link } from "@nextui-org/link";
import { useDisclosure } from "@nextui-org/modal";
import React from "react";
import MarkdownTutorialModal from "./MarkdownTutorialModal";

function MarkdownTutorialBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Link size="sm" href="#" onClick={() => onOpen()}>
        마크다운 도움말
      </Link>
      <MarkdownTutorialModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default MarkdownTutorialBtn;
