"use client";

import { useEffect, useState } from "react";
import { major as majorList } from "@/constant/major";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { Frown, Plus, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProjectListSkeleton } from "@/components/skeletons/ListSkeletons";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Tables } from "@/types/database.types";
import Typography from "@/components/common/Typography";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import ProjectDisplayCard from "./components/ProjectDisplayCard";
import { getMajorObjByCode } from "@/utils/getMajorObjByCode";
import MajorSelectTab from "@/components/MajorSelectTab/MajorSelectTab";
import FloatMenuContainer from "@/components/common/FloatMenu/FloatMenuContainer";

export default function ProjectsPage() {
  const router = useRouter();
  const [major, setMajor] = useState<any>(majorList[1].code);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [projectList, setProjectList] = useState<Tables<"project">[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchMode, setSearchMode] = useState<string>("new");
  const [onProgressOnly, setOnProgressOnly] = useState(false);

  const supabase = createClient();

  const getProjectList = async (query: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.rpc(
      `search_projects_${searchMode}_sort` as any,
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

  // console.log(projectList);

  return (
    <div className={"relative w-full flex flex-col pt-2"}>
      <div className="w-full flex flex-col gap-4 pt-2 items-center">
        <FloatMenuContainer major={major} setMajor={setMajor} />
        <div className="w-full flex gap-1 items-center max-w-xl">
          <SearchInput
            value={searchQuery}
            setValue={setSearchQuery}
            onSubmit={handleClickSearch}
            onClear={handleClickClear}
            placeholder={`${getMajorObjByCode(major)?.name} 프로젝트 검색...`}
          />
          <Button
            variant="default"
            className="h-8 w-8 p-0 shadow-lg"
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
          <Button size="sm" onClick={() => router.push("/projects/new")}>
            <Plus size={18} className="mr-2" />새 프로젝트
          </Button>
          <div
            className={
              "flex flex-col sm:flex-row items-end sm:items-center gap-2"
            }
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={onProgressOnly}
                onCheckedChange={(checked) =>
                  setOnProgressOnly(checked === true)
                }
              />
              <Typography variant={"caption"}>모집중인 프로젝트만</Typography>
            </div>
            <Select
              value={searchMode}
              onValueChange={(value) => setSearchMode(value)}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">인기순</SelectItem>
                <SelectItem value="new">최신순</SelectItem>
              </SelectContent>
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
          <ProjectListSkeleton count={6} />
        )}
      </div>
    </div>
  );
}
