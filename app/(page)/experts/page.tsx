"use client";

import { major as majorList } from "@/constant/major";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Key } from "@react-types/shared";
import { Tables } from "@/types/database.types";
import SearchInput from "@/components/common/SearchInput";
import { supabase } from "@/lib/supabaseClient";
import { Frown, Search } from "lucide-react";
import ExpertProfileDisplayCard from "./edit/[id]/components/expertProfileDisplayCard";
import Typography from "@/components/common/Typography";

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

  useEffect(() => {
    if (searchQuery === "") {
      getProfileList(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className={"w-full flex flex-col py-4"}>
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-full flex gap-1 items-center max-w-xl">
          <SearchInput
            value={searchQuery}
            setValue={setSearchQuery}
            onSubmit={handleClickSearch}
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
      <div className={"w-full flex flex-wrap gap-4 mt-4"}>
        {profileList.length > 0 ? (
          profileList.map((profile) => (
            <ExpertProfileDisplayCard key={profile.id} profile={profile} />
          ))
        ) : (
          <div
            className={
              "mx-auto flex flex-col items-center justify-center gap-2 my-5"
            }
          >
            <Frown size={96} />
            <Typography variant={"text"}>검색결과가 없습니다</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
