import { Input } from "@nextui-org/input";
import React from "react";
import { SearchIcon } from "../icons";
import { Kbd } from "@nextui-org/kbd";

function SearchInput({
  value,
  setValue,
  onSubmit,
  onClear,
}: {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

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
        <div className="flex items-center gap-1">
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          <Kbd className="hidden lg:inline-block" keys={["enter"]}>
            {/* Enter */}
          </Kbd>
        </div>
      }
      type="search"
      isClearable
      onKeyDown={handleKeyDown}
      onClear={onClear}
    />
  );
}

export default SearchInput;
