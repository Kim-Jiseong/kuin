"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Typography from "@/components/common/Typography";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import { FileObj } from "@/types";
import useForm from "@/hooks/useForm";
import { major } from "@/constant/major";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { updateProject } from "@/service/project/action";
import MarkdownTutorialBtn from "@/components/MarkdownTutorial/MarkdownTutorialBtn";
import { ChevronDown, PlusIcon, Trash2 } from "lucide-react";
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
  const [previewMajor, setPreviewMajor] = useState<any>(major[1].code);
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
    const { error, data} = await supabase.storage
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
                fullPath: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + filePath,
                name: file.name,
                size: file.size,
                lastModified: file.lastModified,
              });
            }
          }

          const updateResponse = await updateProject(updatedProject.id, {
            files: fileUrls as any,
          });
          // console.log(updateResponse);
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

  // console.log(projectData);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-6">프로젝트 수정하기</h1>
      <div className="flex flex-col gap-3">
        <div className={`flex items-center gap-4`}>
          <Typography variant="subtitle2">프로젝트 분야:</Typography>
          <Tabs
            value={previewMajor}
            onValueChange={setPreviewMajor}
          >
            <TabsList className="rounded-full">
              {major.map(
                (major) =>
                  major.isVisible && (
                    <TabsTrigger key={major.code} value={major.code} className="rounded-full">
                      {major.name}
                    </TabsTrigger>
                  )
              )}
            </TabsList>
          </Tabs>
        </div>
        <div className={`flex items-center gap-4`}>
          <Typography variant="subtitle2">프로젝트 상태:</Typography>
          <StatusEditDropdown status={status} setStatus={setStatus} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">제목 *</Label>
          <Input
            required
            id="title"
            placeholder="프로젝트 제목을 입력하세요"
            onChange={handleChange}
            className={result.errorField.includes("title") ? "border-destructive" : ""}
            defaultValue={projectData.title as string}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact">연락처 *</Label>
          <Input
            required
            id="contact"
            placeholder="전문가들이 연락드릴 수 있는 연락처를 입력해주세요(이메일, 전화번호 등)"
            onChange={handleChange}
            className={result.errorField.includes("contact") ? "border-destructive" : ""}
            defaultValue={projectData.contact as string}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="introduction">소개 *</Label>
          <Textarea
            id="introduction"
            required
            placeholder="프로젝트에 대한 간단한 소개를 입력하세요"
            className={result.errorField.includes("introduction") ? "border-destructive" : ""}
            onChange={handleChange}
            defaultValue={projectData.introduction as string}
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="detail">상세 내용 - 마크다운 문법 지원 *</Label>
          <Textarea
            id="detail"
            required
            placeholder="프로젝트의 상세한 내용을 설명해주세요.&#10;외부 링크는 [주소 이름](http://kuin.me) 형식으로 작성해주세요.&#10;보다 자세한 설명은 하단 링크를 참고해주세요."
            onChange={handleChange}
            className={result.errorField.includes("detail") ? "border-destructive" : ""}
            defaultValue={projectData.detail as string}
            rows={8}
          />
          <div className="w-full flex pt-2">
            <MarkdownTutorialBtn />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Typography variant="subtitle2">첨부 파일 </Typography>
            <label
              htmlFor="fileInput"
              className={
                "w-auto flex gap-2 items-center cursor-pointer bg-primary text-background px-2 py-1 rounded-md"
              }
            >
              <PlusIcon size={16} />
              <Typography variant="text" style={{ fontSize: 14 }}>
                파일 추가
              </Typography>
            </label>
          </div>
          <input
            className={"hidden"}
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileChange}
          />

          {existingFiles.length > 0 && (
            <div className="flex flex-col gap-1 mt-2">
              {existingFiles.map((file, index) => (
                <Card key={index}>
                  <CardContent>
                    <li className="flex justify-between items-center">
                      <Typography
                        variant="text"
                        style={{ fontSize: 14 }}
                        ellipsis
                        lines={1}
                      >
                        {file.name}
                      </Typography>
                      <Button
                        color="danger"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleFileDelete(index, true)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </li>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {newFiles.length > 0 && (
            <div className="flex flex-col gap-1 mt-2">
              {newFiles.map((file, index) => (
                <Card key={index}>
                  <CardContent>
                    <li className="flex justify-between items-center">
                      <Typography
                        variant="text"
                        style={{ fontSize: 14 }}
                        ellipsis
                        lines={1}
                      >
                        {file.name}
                      </Typography>
                      <Button
                        color="danger"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleFileDelete(index, false)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </li>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 w-full mt-4">
        <Button
          size="lg"
          onClick={() => router.back()}
          variant="outline"
          className="w-full"
        >
          취소
        </Button>
        <Button
          size="lg"
          type="submit"
          disabled={isPending}
          onClick={handleSubmit}
          className="w-full"
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default ProjectEditModePage;
