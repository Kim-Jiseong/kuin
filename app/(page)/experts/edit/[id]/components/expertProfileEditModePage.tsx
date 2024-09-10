"use client";
import { updateProfile } from "@/service/profile/action";
import Typography from "@/components/common/Typography";
import { major } from "@/constant/major";
import useForm from "@/hooks/useForm";
import { supabase } from "@/lib/supabaseClient";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Tab, Tabs } from "@nextui-org/react";
import { CirclePlus, PlusIcon, Trash, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";

function ExpertProfileEditModePage({
  // userData,
  expertData,
  // setEditMode,
  // session,
  // updateSession,
  // refetch,
  profileId,
}: {
  expertData: any;
  // setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  profileId: string;
  // session: Session | null;
  // updateSession: any;
  // refetch: (
  //   options?: RefetchOptions
  // ) => Promise<QueryObserverResult<any, Error>>;
}) {
  const router = useRouter();
  const fields = expertData || {
    name: "",
    introduction: "",
    detail: "",
    profileImage: "",
    contact: "",
    major: major[0].code,
    portfolio: [],
  };
  const { handleChange, result, validate } = useForm(fields);
  const [image, setImage] = useState<File | null>(null);
  const [previewProfileUrl, setPreviewProfileUrl] = useState<string | null>(
    expertData?.profileImage || null
  );
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [previewPortfolioUrls, setPreviewPortfolioUrls] = useState<string[]>(
    expertData?.portfolio || []
  );

  const [previewMajor, setPreviewMajor] = useState(
    expertData?.major || major[1].code
  );

  const [isPending, setIsPending] = useState(false);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewProfileUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileUpload = async () => {
    if (!image) return;

    const fileExt = image.name.split(".").pop();
    const fileName = `expert_profile-${Date.now()}.${fileExt}`;
    const filePath = `expert_profile/${profileId}/${fileName}`;

    const { error, data } = await supabase.storage
      .from("profile")
      .upload(filePath, image, { cacheControl: "3500", upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
    } else {
      console.log("File uploaded successfully:", data, filePath);
      return data.fullPath;
    }
  };

  // ------------------------------ //
  const handlePortfolioImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setPortfolioImages((prev) => [...prev, ...fileArray]);

      // 미리보기 URL 생성
      const previewArray = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewPortfolioUrls((prev) => [...prev, ...previewArray]);
    }
  };

  const handlePortfolioImageUpload = async (image: File) => {
    const fileExt = image.name.split(".").pop();
    const fileName = `portfolio-${Date.now()}.${fileExt}`;
    const filePath = `portfolio/${profileId}/${fileName}`;

    const { error, data } = await supabase.storage
      .from("files")
      .upload(filePath, image, { cacheControl: "3500", upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    } else {
      console.log("File uploaded successfully:", data, filePath);
      return data.fullPath;
    }
  };
  const handlePortfolioImageDelete = (index: number) => {
    setPortfolioImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewPortfolioUrls((prev) => prev.filter((_, i) => i !== index));
  };
  // ------------------------------ //

  const handleClickCancel = () => {
    setImage(null);
    setPreviewProfileUrl(null);
    setPortfolioImages([]);
    setPreviewPortfolioUrls([]);
    router.push(`/experts/${profileId}`);
  };

  const handleClickSubmit = async () => {
    const validation = validate();
    if (validation) {
      setIsPending(true);
      let portfolioFilePath: string[] = previewPortfolioUrls.filter(
        (url) => !url.startsWith("blob:")
      );

      for (const image of portfolioImages) {
        const filePath = await handlePortfolioImageUpload(image);
        if (filePath) {
          portfolioFilePath.push(
            process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + filePath
          );
        }
      }

      let profileFilePath = null;
      if (previewProfileUrl && image) {
        profileFilePath = await handleProfileUpload();
      }

      const updateResponse = await updateProfile(profileId, {
        expert_profile: {
          ...result.data,
          profileImage: profileFilePath
            ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${profileFilePath}`
            : expertData?.profileImage,
          major: previewMajor,
          portfolio: portfolioFilePath
            ? portfolioFilePath
            : expertData?.portfolio,
        },
      });

      console.log("제출됨", updateResponse);
      setIsPending(false);

      handleClickCancel();
    }
  };

  return (
    <div className={"flex flex-col w-full py-4"}>
      <Typography variant={"subtitle1"} className={"mb-4"}>
        전문가 프로필 {expertData ? "수정" : "만들기"}
      </Typography>

      <div className="flex flex-col items-center gap-2 w-full">
        <Avatar
          size={"lg"}
          radius="md"
          isBordered
          src={previewProfileUrl ? previewProfileUrl : undefined}
          className="flex-shrink-0"
        />
        <label htmlFor="profileImageInput" className={"cursor-pointer"}>
          <Typography variant="caption" color={"primary"}>
            사진 {previewProfileUrl ? "수정" : "업로드"}
          </Typography>{" "}
        </label>
        <input
          className={"hidden"}
          id="profileImageInput"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
        />
      </div>
      <div className="flex flex-col gap-4 text-center items-center w-full">
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
              major.isVisible && <Tab key={major.code} title={major.name}></Tab>
          )}
        </Tabs>
        <Input
          variant={"bordered"}
          id="name"
          required
          label={"이름"}
          isRequired
          //   onValueChange={setPreviewName}
          isInvalid={result.errorField.includes("name")}
          onChange={handleChange}
          defaultValue={expertData?.name}
        />
        <Input
          variant={"bordered"}
          id="introduction"
          required
          label={"한줄 소개"}
          isRequired
          isInvalid={result.errorField.includes("introduction")}
          //   onValueChange={setPreviewIntroduction}
          onChange={handleChange}
          defaultValue={expertData?.introduction}
        />
        <Input
          variant={"bordered"}
          id="contact"
          required
          label={"연락처"}
          isRequired
          isInvalid={result.errorField.includes("contact")}
          //   onValueChange={setPreviewIntroduction}
          onChange={handleChange}
          defaultValue={expertData?.contact}
        />
        <Textarea
          variant={"bordered"}
          id="detail"
          label={"상세 소개 - 마크다운 문법 지원"}
          placeholder={
            "포트폴리오 등 외부 링크는 [주소에 대한 설명(선택)](http://www.google.co.kr) 형식으로 작성해주세요."
          }
          minRows={5}
          required
          isRequired
          isInvalid={result.errorField.includes("detail")}
          //   onValueChange={setPreviewDetail}
          onChange={handleChange}
          defaultValue={expertData?.detail}
        />
      </div>
      <div className="flex items-center gap-4 mt-6">
        <Typography variant={"subtitle1"}>포트폴리오</Typography>
        <Button startContent={<PlusIcon />} color="primary" size="sm">
          <label htmlFor="portfolioImageInput" className={"cursor-pointer"}>
            사진 {expertData ? "추가" : "업로드"}
          </label>
        </Button>
      </div>
      <div className="flex flex-col w-full">
        <input
          className={"hidden"}
          id="portfolioImageInput"
          type="file"
          multiple
          accept="image/*"
          onChange={handlePortfolioImageChange}
        />
        <div className="flex flex-wrap gap-4 my-4">
          {previewPortfolioUrls.map((url, index) => (
            <div key={url} className="relative">
              <Image
                src={url}
                alt={`preview-${index}`}
                className={
                  "max-w-[160px] max-h-[160px] rounded-md overflow-hidden object-cover"
                }
              />
              <Button
                size="sm"
                color="danger"
                onPress={() => handlePortfolioImageDelete(index)}
                className="absolute top-[-12px] right-[-12px] z-10"
                isIconOnly
                variant={"solid"}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 w-full mt-4">
        {expertData && (
          <Button
            size="lg"
            color={"default"}
            onPress={handleClickCancel}
            variant={"solid"}
            fullWidth
            radius={"md"}
          >
            취소
          </Button>
        )}
        <Button
          size="lg"
          color={"primary"}
          variant={"solid"}
          fullWidth
          radius={"md"}
          onPress={handleClickSubmit}
          isLoading={isPending}
          //   onClick={handleClickSubmit}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}

export default ExpertProfileEditModePage;
