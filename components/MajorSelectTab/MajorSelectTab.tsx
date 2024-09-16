import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { major as majorList } from "@/constant/major";
import { returnMajorColor } from "@/utils/returnMajorColor";

function MajorSelectTab({
  major,
  setMajor,
  bgColor,
}: {
  major: string;
  setMajor: any;
  bgColor?: string;
  //   setMajor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Tabs
      aria-label="Major Option"
      selectedKey={major}
      onSelectionChange={setMajor}
      size={"lg"}
      radius={"full"}
      color={returnMajorColor(major)}
      classNames={{
        tabList: bgColor ? `bg-${bgColor}` : "",
      }}
    >
      {majorList.map(
        (major) =>
          major.isVisible && <Tab key={major.code} title={major.name}></Tab>
      )}
    </Tabs>
  );
}

export default MajorSelectTab;
