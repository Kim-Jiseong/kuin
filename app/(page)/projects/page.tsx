"use client";

import { useEffect, useState } from "react";
import { major as majorList } from "@/constant/major";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@nextui-org/button";
import { Frown, Search } from "lucide-react";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Tables } from "@/types/database.types";
import Typography from "@/components/common/Typography";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import ProjectDisplayCard from "./components/ProjectDisplayCard";
import { getMajorObjByCode } from "@/utils/getMajorObjByCode";

export default function ProjectsPage() {
  const router = useRouter();
  const [major, setMajor] = useState<any>(majorList[1].code);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [projectList, setProjectList] = useState<Tables<"project">[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProfileList = async (query: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.rpc(
      "search_projects_with_owner_profile",
      {
        major_filter: major,
        search_text: query,
      } as { major_filter: string; search_text: string }
    );
    if (data) {
      setProjectList(data);
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
    getProfileList(searchQuery);
    setSearchQuery("");
  }, [major]);
  console.log(projectList);

  return (
    <div className={"w-full flex flex-col pt-2"} role="button">
      <div className="w-full flex flex-col gap-4 pt-2 items-center">
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
        <div className="w-full flex gap-1 items-center max-w-xl">
          <SearchInput
            value={searchQuery}
            setValue={setSearchQuery}
            onSubmit={handleClickSearch}
            onClear={handleClickClear}
            placeholder={`${getMajorObjByCode(major)?.name} 프로젝트 검색...`}
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
      </div>
      <div className={"w-full flex flex-wrap gap-4 mt-4 pb-4"}>
        {!isLoading ? (
          projectList.length > 0 ? (
            projectList.map((project) => (
              <ProjectDisplayCard key={project.id} project={project} />
              // <ExpertProfileDisplayCard key={profile.id} profile={profile} />
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
