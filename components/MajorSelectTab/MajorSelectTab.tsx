import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { major as majorList } from "@/constant/major";
import { cn } from "@/lib/utils";

function MajorSelectTab({
  major,
  setMajor,
  bgColor,
}: {
  major: string;
  setMajor: (major: string) => void;
  bgColor?: string;
}) {
  return (
    <Tabs value={major} onValueChange={setMajor}>
      <TabsList className={cn("rounded-full", bgColor && `bg-${bgColor}`)}>
        {majorList.map(
          (majorItem) =>
            majorItem.isVisible && (
              <TabsTrigger
                key={majorItem.code}
                value={majorItem.code}
                className="rounded-full"
              >
                {majorItem.name}
              </TabsTrigger>
            )
        )}
      </TabsList>
    </Tabs>
  );
}

export default MajorSelectTab;
