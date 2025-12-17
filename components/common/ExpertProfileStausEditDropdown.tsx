"use client";
import { getProfileStatusNameByCode } from "@/utils/getProfileStatusNameByCode";
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

function ExpertProfileStausEditDropdown({
  status,
  setStatus,
}: {
  status: string | null;
  setStatus: (status: string) => void;
}) {
  if (!status) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2 h-auto">
          <Badge variant={status === "public" ? "default" : "secondary"}>
            {getProfileStatusNameByCode(status)}
          </Badge>
          <ChevronDown size={16} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setStatus("public")}>
          <Badge variant="default">공개</Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("private")}>
          <Badge variant="secondary">비공개</Badge>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ExpertProfileStausEditDropdown;
