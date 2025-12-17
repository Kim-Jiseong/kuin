"use client";
import { getStatusNameByCode } from "@/utils/getStatusNameByCode";
import { getProjectStatusBadgeStyle } from "@/utils/getProjectStatusBadgeStyle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

function ProjectStatusEditDropdown({
  status,
  setStatus,
}: {
  status: string | null;
  setStatus: (status: string) => void;
}) {
  if (!status) return null;

  const currentStyle = getProjectStatusBadgeStyle(status);
  const openStyle = getProjectStatusBadgeStyle("open");
  const ongoingStyle = getProjectStatusBadgeStyle("ongoing");
  const doneStyle = getProjectStatusBadgeStyle("done");
  const canceledStyle = getProjectStatusBadgeStyle("canceled");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2 h-auto">
          <Badge
            variant={currentStyle.variant}
            className={cn(currentStyle.className)}
          >
            {getStatusNameByCode(status)}
          </Badge>
          <ChevronDown size={16} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setStatus("open")}>
          <Badge
            variant={openStyle.variant}
            className={cn(openStyle.className)}
          >
            모집중
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("ongoing")}>
          <Badge
            variant={ongoingStyle.variant}
            className={cn(ongoingStyle.className)}
          >
            진행중
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("done")}>
          <Badge
            variant={doneStyle.variant}
            className={cn(doneStyle.className)}
          >
            완료됨
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("canceled")}>
          <Badge
            variant={canceledStyle.variant}
            className={cn(canceledStyle.className)}
          >
            취소됨
          </Badge>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProjectStatusEditDropdown;
