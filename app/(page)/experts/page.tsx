"use client";

import { major as majorList } from "@/constant/major";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Key } from "@react-types/shared";
import { Tables } from "@/types/database.types";
import SearchInput from "@/components/common/SearchInput";
import { supabase } from "@/lib/supabaseClient";
import { Search } from "lucide-react";
import ExpertProfileDisplayCard from "./edit/[id]/components/expertProfileDisplayCard";

export default function ExpertsPage() {
  const [major, setMajor] = useState<any>(majorList[1].code);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [profileList, setProfileList] = useState<Tables<"profile">[]>([]);

  const getProfileList = async (query: string) => {
    const { data, error } = await supabase.rpc("search_expert_profiles", {
      major_filter: major,
      search_text: query,
    } as { major_filter: string; search_text: string });
    if (data) {
      setProfileList(data);
    }
  };

  const handleClickClear = () => {
    getProfileList("");
  };
  const handleClickSearch = () => {
    getProfileList(searchQuery);
  };

  useEffect(() => {
    getProfileList(searchQuery);
    setSearchQuery("");
  }, [major]);

  return (
    <div className={"w-full flex flex-col py-4"}>
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-full flex gap-1 items-center max-w-xl">
          <SearchInput
            value={searchQuery}
            setValue={setSearchQuery}
            onClear={handleClickClear}
          />
          <Button
            variant={"shadow"}
            isIconOnly
            color={"primary"}
            onClick={handleClickSearch}
          >
            <Search />
          </Button>
        </div>
        <Tabs
          aria-label="Options"
          selectedKey={major}
          onSelectionChange={setMajor}
          size={"lg"}
          radius={"full"}
          color={returnMajorColor(major)}
        >
          {majorList.map(
            (major) =>
              major.isVisible && <Tab key={major.code} title={major.name}></Tab>
          )}
        </Tabs>
      </div>
      <div>
        {profileList.map((profile) => (
          <ExpertProfileDisplayCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
