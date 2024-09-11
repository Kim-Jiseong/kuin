"use client";

import { major as majorList } from "@/constant/major";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Button, Input, Link, Spinner, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Key } from "@react-types/shared";
import { Tables } from "@/types/database.types";
import SearchInput from "@/components/common/SearchInput";
import { supabase } from "@/lib/supabaseClient";
import { Frown, Search } from "lucide-react";
import ExpertProfileDisplayCard from "./components/expertProfileDisplayCard";
import Typography from "@/components/common/Typography";
import { getMyProfile } from "./[id]/action";

export default function ExpertsPage() {
  const [major, setMajor] = useState<any>(majorList[1].code);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [myProfile, setMyProfile] = useState<Tables<"profile">>();
  const [profileList, setProfileList] = useState<Tables<"profile">[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMy = async () => {
    const myProfile = await getMyProfile();
    if (myProfile) {
      setMyProfile(myProfile.profile);
    }
  };
  const getProfileList = async (query: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.rpc("search_expert_profiles", {
      major_filter: major,
      search_text: query,
    } as { major_filter: string; search_text: string });
    if (data) {
      setProfileList(data);
    }
    setIsLoading(false);
  };

  const handleClickClear = () => {
    getProfileList("");
  };

  const handleClickSearch = () => {
    getProfileList(searchQuery);
  };

  useEffect(() => {
    getMy();
  }, []);

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
    <div className={"w-full flex flex-col pt-2"}>
      {myProfile?.expert_profile === null && (
        <div
          className={
            "w-full max-w-xl mx-auto py-2 px-4 bg-primary-100 border-1 border-primary-500 text-center break-keep text-sm flex items-center justify-center gap-4 rounded-lg "
          }
        >
          <p>
            아직 전문가 프로필이 없으시네요! 전문가 프로필을 등록하시겠어요?
          </p>
          <Link
            size="sm"
            underline="always"
            href={"/experts/edit/" + myProfile?.id}
          >
            등록하기
          </Link>
        </div>
      )}
      <div className="w-full flex flex-col gap-4 pt-2 items-center">
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
      <div className={"w-full flex flex-wrap gap-4 mt-4 pb-4"}>
        {!isLoading ? (
          profileList.length > 0 ? (
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
          )
        ) : (
          <div
            className={
              "mx-auto flex flex-col items-center justify-center gap-2 my-10"
            }
          >
            {/* <Typography variant={"text"}>로딩중입니다</Typography> */}
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
