import { Input } from "@nextui-org/input";
import React from "react";
import { SearchIcon } from "../icons";
import { Kbd } from "@nextui-org/kbd";

function SearchInput({
  value,
  setValue,
  onClear,
}: {
  value: string;
  setValue: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <Input
      aria-label="Search"
      variant={"bordered"}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      value={value}
      onValueChange={setValue}
      // endContent={
      //   <Kbd className="hidden lg:inline-block" keys={["enter"]}>
      //     Enter
      //   </Kbd>
      // }
      labelPlacement="outside"
      placeholder="검색..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      isClearable
      onClear={onClear}
    />
  );
}

export default SearchInput;
