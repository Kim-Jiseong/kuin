"use client";
import { getProfileStatusNameByCode } from "@/utils/getProfileStatusNameByCode";
import { returnProfileStatusColor } from "@/utils/returnProfileStatusColor";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import React from "react";

function ExpertProfileStausEditDropdown({
  status,
  setStatus,
}: {
  status: string | null;
  setStatus: (status: string) => void;
}) {
  return (
    <>
      {status && (
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button variant={"light"} className={`px-2`}>
              <Chip color={returnProfileStatusColor(status)}>
                {getProfileStatusNameByCode(status)}
              </Chip>
              <ChevronDown size={16} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="change-status"
            onAction={(key) => setStatus(key as string)}
            selectionMode="single"
          >
            <DropdownItem key="public">
              <Chip color={returnProfileStatusColor("public")}>공개</Chip>
            </DropdownItem>
            <DropdownItem key="private">
              <Chip color={returnProfileStatusColor("private")}>비공개</Chip>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}

export default ExpertProfileStausEditDropdown;
