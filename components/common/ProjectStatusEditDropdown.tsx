"use client";
import { getStatusNameByCode } from "@/utils/getStatusNameByCode";
import { returnStatusColor } from "@/utils/returnStatusColor";
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

function ProjectStatusEditDropdown({
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
              <Chip color={returnStatusColor(status)}>
                {getStatusNameByCode(status)}
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
            <DropdownItem key="open" aria-label="open">
              <Chip color={returnStatusColor("open")}>모집중</Chip>
            </DropdownItem>
            <DropdownItem key="ongoing" aria-label="ongoing">
              <Chip color={returnStatusColor("ongoing")}>진행중</Chip>
            </DropdownItem>
            <DropdownItem key="done" aria-label="done">
              <Chip color={returnStatusColor("done")}>완료됨</Chip>
            </DropdownItem>
            <DropdownItem key="canceled" aria-label="canceled">
              <Chip color={returnStatusColor("canceled")}>취소됨</Chip>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}

export default ProjectStatusEditDropdown;
