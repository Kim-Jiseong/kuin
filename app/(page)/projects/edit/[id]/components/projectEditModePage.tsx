"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Typography from "@/components/common/Typography";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import { FileObj } from "@/types";
import useForm from "@/hooks/useForm";
import { major } from "@/constant/major";
import { updateProject } from "@/service/project/action";
import MarkdownTutorialBtn from "@/components/MarkdownTutorial/MarkdownTutorialBtn";
import { PlusIcon, Trash2 } from "lucide-react";
import { getMyProfile } from "../../../action";
import StatusEditDropdown from "@/components/common/ProjectStatusEditDropdown";

const ProjectEditModePage = ({
  projectData,
}: {
  projectData: Tables<"project">;
}) => {
  const router = useRouter();
  const fields = projectData || {
    major: major[1].code,
    status: "open",
    title: "",
    contact: "",
    introduction: "",
    detail: "",
    files: [],
  };
  const { handleChange, result, validate } = useForm(fields);

  const [myProfile, setMyProfile] = useState<Tables<"profile">>();
  const [previewMajor, setPreviewMajor] = useState<any>(
    projectData.major || major[1].code
  );
  const [existingFiles, setExistingFiles] = useState<FileObj[]>(
    (projectData.files as any) || []
  );
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState(projectData.status);

  const supabase = createClient();

  const handleFilesUpload = async (file: File, projectId: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${projectId}-${Date.now()}.${fileExt}`;
    const filePath = `project_files/${projectId}/${fileName}`;
    const { error, data } = await supabase.storage
      .from("files")
      .upload(filePath, file, { cacheControl: "3500", upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
    } else {
      return data.fullPath;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (validation) {
      try {
        setIsPending(true);
        const { data: updatedProject, error } = await supabase
          .from("project")
          .update({
            ...result.data,
            major: previewMajor,
            owner_profile: myProfile?.id,
            status: status,
          })
          .eq("id", projectData.id)
          .select()
          .single();

        let fileUrls: FileObj[] = [...existingFiles];
        if (updatedProject) {
          for (let file of newFiles) {
            const filePath = await handleFilesUpload(file, updatedProject.id);
            if (filePath) {
              fileUrls.push({
                fullPath:
                  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + filePath,
                name: file.name,
                size: file.size,
                lastModified: file.lastModified,
              });
            }
          }

          const updateResponse = await updateProject(updatedProject.id, {
            files: fileUrls as any,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsPending(false);
        router.push("/projects/" + projectData.id);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles([...newFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleFileDelete = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setExistingFiles(existingFiles.filter((_, i) => i !== index));
    } else {
      setNewFiles(newFiles.filter((_, i) => i !== index));
    }
  };

  const getMy = async () => {
    const myProfile = await getMyProfile();
    if (myProfile) {
      setMyProfile(myProfile.profile);
    }
  };

  useEffect(() => {
    getMy();
  }, []);

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-8">
          <div className="flex justify-between items-start gap-4">
            <Input
              required
              id="title"
              placeholder="프로젝트 제목을 입력하세요"
              onChange={handleChange}
              defaultValue={projectData.title as string}
              className={`text-3xl font-bold border-none shadow-none px-0 placeholder:text-gray-300 focus-visible:ring-0 h-auto py-2 ${result.errorField.includes("title") ? "text-destructive placeholder:text-destructive/50" : ""}`}
            />
            <div className="shrink-0 pt-2">
              <StatusEditDropdown status={status} setStatus={setStatus} />
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <span className="text-sm font-medium">분야</span>
            <Tabs value={previewMajor} onValueChange={setPreviewMajor}>
              <TabsList className="bg-transparent p-0 h-auto flex flex-wrap gap-2 justify-start">
                {major.map(
                  (m) =>
                    m.isVisible && (
                      <TabsTrigger
                        key={m.code}
                        value={m.code}
                        className="rounded-full border border-gray-200 bg-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary px-4 py-1.5 h-auto text-sm font-normal shadow-sm transition-all hover:border-primary/50 cursor-pointer"
                      >
                        {m.name}
                      </TabsTrigger>
                    )
                )}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="space-y-2">
            <Label
              htmlFor="introduction"
              className="text-sm font-medium text-gray-500"
            >
              한줄 소개
            </Label>
            <Input
              id="introduction"
              required
              onChange={handleChange}
              defaultValue={projectData.introduction as string}
              placeholder="프로젝트의 핵심을 한 문장으로 설명해주세요"
              className={`border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary shadow-none text-xl font-medium ${result.errorField.includes("introduction") ? "border-destructive placeholder:text-destructive" : ""}`}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact"
              className="text-sm font-medium text-gray-500"
            >
              연락처 (모집중일 때만 공개)
            </Label>
            <Input
              required
              id="contact"
              placeholder="이메일 또는 전화번호"
              onChange={handleChange}
              defaultValue={projectData.contact as string}
              className={`border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary shadow-none ${result.errorField.includes("contact") ? "border-destructive" : ""}`}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="detail" className="text-lg font-bold">
                상세 내용 - 마크다운 문법 지원
              </Label>
              <MarkdownTutorialBtn />
            </div>
            <div
              className={`rounded-xl border border-gray-200 p-4 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all ${result.errorField.includes("detail") ? "border-destructive bg-destructive/5" : "bg-white"}`}
            >
              <Textarea
                id="detail"
                required
                placeholder="프로젝트의 상세한 내용을 설명해주세요.&#10;외부 링크는 [주소 이름](http://kuin.me) 형식으로 작성해주세요."
                onChange={handleChange}
                defaultValue={projectData.detail as string}
                className="min-h-[300px] border-none shadow-none resize-none focus-visible:ring-0 p-0 text-base leading-relaxed"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <span className="text-primary">📎</span> 첨부 파일
              </h3>
              <label
                htmlFor="fileInput"
                className="cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-sm text-gray-600"
              >
                <PlusIcon size={16} />
                파일 추가
              </label>
            </div>
            <input
              className="hidden"
              id="fileInput"
              type="file"
              multiple
              onChange={handleFileChange}
            />

            {existingFiles.length > 0 || newFiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {existingFiles.map((file, index) => (
                  <div
                    key={`existing-${index}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 uppercase shrink-0">
                        {file.name.split(".").pop()}
                      </div>
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                      onClick={() => handleFileDelete(index, true)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                {newFiles.map((file, index) => (
                  <div
                    key={`new-${index}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 uppercase shrink-0">
                        {file.name.split(".").pop()}
                      </div>
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                      onClick={() => handleFileDelete(index, false)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
                첨부할 파일이 있다면 우측 상단 '파일 추가'를 클릭하세요.
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-8 border-t border-gray-100">
          <Button
            size="lg"
            onClick={() => router.back()}
            variant="outline"
            className="px-8 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            취소
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isPending}
            onClick={handleSubmit}
            className="px-8 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditModePage;
