"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab,
} from "@nextui-org/react";
import Typography from "@/components/common/Typography";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getMyProfile } from "../action";
import { FileObj, Tables } from "@/types/database.types";
import useForm from "@/hooks/useForm";
import { major } from "@/constant/major";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { updateProject } from "@/service/project/action";
import MarkdownTutorialBtn from "@/components/MarkdownTutorial/MarkdownTutorialBtn";
import { PlusIcon, Trash2 } from "lucide-react";
import FullPageSpinner from "@/components/common/FullPageSpinner";

const NewProjectPage: React.FC = () => {
  const router = useRouter();
  const fields = {
    major: major[1].code,
    title: "",
    contact: "",
    introduction: "",
    detail: "",
  };
  const { handleChange, result, validate } = useForm(fields);

  const [myProfile, setMyProfile] = useState<Tables<"profile">>();

  const [previewMajor, setPreviewMajor] = useState<any>(major[1].code);
  const [files, setFiles] = useState<File[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const handleFilesUpload = async (file: File, projectId: string) => {
    // const encodedFileName = encodeURIComponent(file.name);
    const fileExt = file.name.split(".").pop();
    const fileName = `${projectId}-${Date.now()}.${fileExt}`;
    const filePath = `project_files/${projectId}/${fileName}`;
    // console.log(fileName, filePath);
    const { error, data } = await supabase.storage
      .from("files")
      .upload(filePath, file, { cacheControl: "3500", upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
    } else {
      // console.log("File uploaded successfully:", data, filePath);
      return data.fullPath;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    // console.log(result, validation);
    if (validation) {
      try {
        setIsPending(true);
        const { data: createProjectData, error } = await supabase
          .from("project")
          .insert([
            {
              ...result.data,
              major: previewMajor,
              status: "open",
              owner_profile: myProfile?.id,
            },
          ])
          .select()
          .single();
        // console.log(createProjectData);
        let uploadingFiles: FileObj[] = [];
        for (let file of files) {
          const filePath = await handleFilesUpload(file, createProjectData.id);
          if (filePath) {
            uploadingFiles.push({
              fullPath: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + filePath,
              name: file.name,
              size: file.size,
              lastModified: file.lastModified,
            });
          }
        }
        const updateResponse = await updateProject(createProjectData.id, {
          files: uploadingFiles,
        });
        // console.log(updateResponse);
        router.push("/projects/" + createProjectData.id);
      } catch (e) {
        console.log(e);
      } finally {
        setIsPending(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // 기존 파일 목록에 새로 선택된 파일을 추가
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleFileDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getMy = async () => {
    const myProfile = await getMyProfile();
    if (myProfile) {
      setMyProfile(myProfile.profile);
    }
    setInitialLoading(false);
  };

  useEffect(() => {
    getMy();
  }, []);

  if (initialLoading) return <FullPageSpinner />;
  else if (!myProfile)
    return (
      <div
        className={`flex flex-col w-full items-center h-[50vh] justify-center gap-4`}
      >
        <Typography variant="subtitle2">
          5초만에 로그인하고 48시간 내에 원하는 결과물을 받아보세요
        </Typography>
        <Button color="primary" onClick={() => router.push("/auth")}>
          <Typography variant="text" className={"font-semibold"}>
            로그인하기
          </Typography>
        </Button>
      </div>
    );
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-6">새 프로젝트 만들기</h1>
      <div className="flex flex-col gap-3">
        <div className={`flex items-center gap-4`}>
          <Typography variant="subtitle2">프로젝트 분야:</Typography>
          <Tabs
            aria-label="Options"
            selectedKey={previewMajor}
            onSelectionChange={setPreviewMajor}
            size={"lg"}
            radius={"full"}
            color={returnMajorColor(previewMajor)}
          >
            {major.map(
              (major) =>
                major.isVisible && (
                  <Tab key={major.code} title={major.name}></Tab>
                )
            )}
          </Tabs>
        </div>

        <Input
          fullWidth
          required
          isRequired
          id="title"
          label="제목"
          placeholder="프로젝트 제목을 입력하세요"
          onChange={handleChange}
          isInvalid={result.errorField.includes("title")}
        />
        <Input
          fullWidth
          required
          isRequired
          id="contact"
          label='연락처 - 프로젝트가 "모집중"인 경우에만 공개'
          placeholder="전문가들이 연락드릴 수 있는 연락처를 입력해주세요(이메일, 전화번호 등)"
          onChange={handleChange}
          isInvalid={result.errorField.includes("contact")}
        />

        <Textarea
          id="introduction"
          required
          isRequired
          fullWidth
          label="소개"
          placeholder="프로젝트에 대한 간단한 소개를 입력하세요"
          isInvalid={result.errorField.includes("introduction")}
          onChange={handleChange}
        />
        <div className={"flex flex-col"}>
          <Textarea
            id="detail"
            required
            isRequired
            fullWidth
            label="상세 내용 - 마크다운 문법 지원"
            placeholder={`프로젝트의 상세한 내용을 설명해주세요.\n외부 링크는 [주소 이름](http://kuin.me) 형식으로 작성해주세요.\n보다 자세한 설명은 하단 링크를 참고해주세요.
            `}
            onChange={handleChange}
            isInvalid={result.errorField.includes("detail")}
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

          {files.length > 0 ? (
            <div className="flex flex-col gap-1 mt-2">
              {files.map((file, index) => (
                <Card key={index}>
                  <CardBody>
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
                        isIconOnly
                        onClick={() => handleFileDelete(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </li>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className={"pt-1 pb-4 flex"}>
              <Typography variant={"caption"}>
                왼쪽 상단의 &quot;파일 추가&quot; 버튼을 클릭하고 파일을
                첨부하세요
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 w-full mt-4">
        <Button
          size="lg"
          color={"primary"}
          variant={"solid"}
          fullWidth
          radius={"md"}
          type="submit"
          isLoading={isPending}
          onClick={handleSubmit}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default NewProjectPage;
