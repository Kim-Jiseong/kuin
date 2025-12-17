import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import React from "react";
import MarkdownTutorialContainer from "./MarkdownTutorialContainer";

function MarkdownTutorialModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>마크다운 튜토리얼</DialogHeader>
        <div>
          <MarkdownTutorialContainer />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownTutorialModal;
