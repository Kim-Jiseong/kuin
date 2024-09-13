"use client";

import { useEffect, useState } from "react";
import { major as majorList } from "@/constant/major";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@nextui-org/button";
import { Frown, Plus, Search } from "lucide-react";
import {
  Checkbox,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
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
  const [searchMode, setSearchMode] = useState<string>("new");
  const [onProgressOnly, setOnProgressOnly] = useState(false);

  const getProjectList = async (query: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.rpc(
      `search_projects_${searchMode}_sort`,
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
    getProjectList("");
  };

  const handleClickSearch = () => {
    getProjectList(searchQuery);
  };

  useEffect(() => {
    getProjectList(searchQuery);
    // setSearchQuery("");
  }, [major, searchMode]);

  return (
    <div className={"w-full flex flex-col pt-2"}>
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
        <div
          className={
            "w-full flex items-end sm:items-center justify-between gap-4 sm:py-4"
          }
        >
          <Button
            startContent={<Plus size={18} />}
            size="sm"
            color="primary"
            onPress={() => router.push("/projects/new")}
          >
            새 프로젝트
          </Button>
          <div
            className={
              "flex flex-col sm:flex-row items-end sm:items-center gap-2"
            }
          >
            <Checkbox
              size="sm"
              isSelected={onProgressOnly}
              onValueChange={setOnProgressOnly}
            >
              <Typography variant={"caption"}>모집중인 프로젝트만</Typography>
            </Checkbox>
            <Select
              size="sm"
              // label="정렬 기준"
              variant="underlined"
              selectedKeys={[searchMode]}
              className="w-36"
              disallowEmptySelection
              onChange={(e) => setSearchMode(e.target.value)}
            >
              <SelectItem key={"view"}>인기순</SelectItem>
              <SelectItem key={"new"}>최신순</SelectItem>
            </Select>
          </div>
        </div>
      </div>
      <div className={"w-full flex flex-wrap gap-4 mt-4 pb-4"}>
        {!isLoading ? (
          projectList.length > 0 ? (
            projectList
              .filter((project) => !onProgressOnly || project.status === "open")
              .map((project) => (
                <ProjectDisplayCard key={project.id} project={project} />
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
