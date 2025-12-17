import { Input } from "@/components/ui/input";
import React from "react";
import { SearchIcon } from "../icons";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function SearchInput({
  value,
  setValue,
  onSubmit,
  onClear,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  placeholder?: string;
}) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <kbd className="hidden lg:inline-block pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          Enter
        </kbd>
      </div>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn("pl-20", value && "pr-8")}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
