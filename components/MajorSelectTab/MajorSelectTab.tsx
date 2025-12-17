import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { major as majorList } from "@/constant/major";
import { cn } from "@/lib/utils";

function MajorSelectTab({
  major,
  setMajor,
}: {
  major: string;
  setMajor: (major: string) => void;
}) {
  return (
    <Tabs value={major} onValueChange={setMajor}>
      <TabsList className={cn("rounded-full bg-transparent")}>
        {majorList.map(
          (majorItem) =>
            majorItem.isVisible && (
              <TabsTrigger
                key={majorItem.code}
                value={majorItem.code}
                className="rounded-full cursor-pointer hover:bg-muted  data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow"
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
