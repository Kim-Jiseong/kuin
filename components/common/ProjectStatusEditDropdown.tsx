"use client";
import { getStatusNameByCode } from "@/utils/getStatusNameByCode";
import { returnStatusColor } from "@/utils/returnStatusColor";
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

  const getStatusVariant = (statusCode: string) => {
    const colorMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      open: "default",
      ongoing: "secondary",
      done: "outline",
      canceled: "destructive",
    };
    return colorMap[statusCode] || "default";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2 h-auto">
          <Badge variant={getStatusVariant(status)}>
            {getStatusNameByCode(status)}
          </Badge>
          <ChevronDown size={16} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setStatus("open")}>
          <Badge variant={getStatusVariant("open")}>모집중</Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("ongoing")}>
          <Badge variant={getStatusVariant("ongoing")}>진행중</Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("done")}>
          <Badge variant={getStatusVariant("done")}>완료됨</Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("canceled")}>
          <Badge variant={getStatusVariant("canceled")}>취소됨</Badge>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProjectStatusEditDropdown;
