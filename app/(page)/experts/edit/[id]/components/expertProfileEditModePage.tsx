"use client";
import { updateProfile } from "@/service/profile/action";
import Typography from "@/components/common/Typography";
import { major } from "@/constant/major";
import useForm from "@/hooks/useForm";
import { createClient } from "@/utils/supabase/client";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { PlusIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MarkdownTutorialBtn from "@/components/MarkdownTutorial/MarkdownTutorialBtn";

function ExpertProfileEditModePage({
  expertData,
  profileId,
}: {
  expertData: any;
  profileId: string;
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

  const supabase = createClient();

  // 파일 업로드 통합 함수
  const uploadFile = async (file: File, type: "profile" | "portfolio") => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${type}/${profileId}/${fileName}`;
    const bucket = type === "profile" ? "profile" : "files";

    const { error, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { cacheControl: "3500", upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    } else {
      // console.log("File uploaded successfully:", data, filePath);
      return data.fullPath;
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewProfileUrl(URL.createObjectURL(file));
    }
  };

  const handlePortfolioImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setPortfolioImages((prev) => [...prev, ...fileArray]);

      const previewArray = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewPortfolioUrls((prev) => [...prev, ...previewArray]);
    }
  };

  const handlePortfolioImageDelete = (index: number) => {
    setPortfolioImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewPortfolioUrls((prev) => prev.filter((_, i) => i !== index));
  };

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
        const filePath = await uploadFile(image, "portfolio");
        if (filePath) {
          portfolioFilePath.push(
            process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + filePath
          );
        }
      }

      let profileFilePath = null;
      if (previewProfileUrl && image) {
        profileFilePath = await uploadFile(image, "profile");
      }

      const updateResponse = await updateProfile(profileId, {
        expert_profile: {
          ...result.data,
          profileImage: profileFilePath
            ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${profileFilePath}`
            : expertData?.profileImage,
          major: previewMajor,
          portfolio: portfolioFilePath.length
            ? portfolioFilePath
            : expertData?.portfolio,
        },
      });

      // console.log("제출됨", updateResponse);
      setIsPending(false);
      handleClickCancel();
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="flex flex-col gap-8">
        {/* Profile Header Image Upload */}
        <div className="flex flex-col items-center gap-4 py-8 border-b border-gray-100">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
              <AvatarImage
                src={previewProfileUrl ? previewProfileUrl : undefined}
                className="object-cover"
              />
              <AvatarFallback className="text-4xl text-gray-300">
                ?
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="profileImageInput"
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity font-medium"
            >
              사진 변경
            </label>
          </div>

          <input
            className="hidden"
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          <div className="text-center">
            <h2 className="text-xl font-bold">
              {expertData ? "프로필 수정" : "전문가 등록"}
            </h2>
            <p className="text-gray-500 text-sm">
              전문가로서의 첫인상을 결정하는 사진을 등록해주세요.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-8">
          {/* Major Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-500">
              활동 분야
            </Label>
            <Tabs value={previewMajor} onValueChange={setPreviewMajor}>
              <TabsList className="bg-transparent p-0 h-auto flex flex-wrap gap-2 justify-start">
                {major.map(
                  (m) =>
                    m.isVisible && (
                      <TabsTrigger
                        key={m.code}
                        value={m.code}
                        className="rounded-full border border-gray-200 bg-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary px-4 py-2 h-auto text-sm font-normal shadow-sm transition-all hover:border-primary/50"
                      >
                        {m.name}
                      </TabsTrigger>
                    )
                )}
              </TabsList>
            </Tabs>
          </div>

          {/* Name & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-500"
              >
                이름 (실명 또는 활동명)
              </Label>
              <Input
                id="name"
                required
                onChange={handleChange}
                defaultValue={expertData?.name}
                placeholder="이름을 입력하세요"
                className={`border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary shadow-none text-lg ${result.errorField.includes("name") ? "border-destructive placeholder:text-destructive" : ""}`}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contact"
                className="text-sm font-medium text-gray-500"
              >
                연락처
              </Label>
              <Input
                id="contact"
                required
                onChange={handleChange}
                defaultValue={expertData?.contact}
                placeholder="이메일 또는 카카오톡 ID"
                className={`border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary shadow-none text-lg ${result.errorField.includes("contact") ? "border-destructive placeholder:text-destructive" : ""}`}
              />
            </div>
          </div>

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
              defaultValue={expertData?.introduction}
              placeholder="나를 가장 잘 표현하는 한 마디"
              className={`border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary shadow-none text-xl font-medium ${result.errorField.includes("introduction") ? "border-destructive placeholder:text-destructive" : ""}`}
            />
          </div>

          {/* Detail with Markdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="detail" className="text-lg font-bold">
                상세 소개 (경력, 이력 등)
              </Label>
              <MarkdownTutorialBtn />
            </div>
            <div
              className={`rounded-xl border border-gray-200 p-4 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all ${result.errorField.includes("detail") ? "border-destructive bg-destructive/5" : "bg-background"}`}
            >
              <Textarea
                id="detail"
                placeholder="자신의 강점, 경력, 작업 스타일 등을 자유롭게 기술해주세요. (Markdown 문법 지원)"
                rows={10}
                required
                onChange={handleChange}
                defaultValue={expertData?.detail}
                className="border-none shadow-none resize-none focus-visible:ring-0 p-0 text-base leading-relaxed min-h-[300px]"
              />
            </div>
          </div>

          {/* Portfolio */}
          <div className="space-y-4 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">포트폴리오</h3>
                <p className="text-sm text-gray-500">
                  이미지 파일을 업로드하여 포트폴리오를 구성하세요.
                </p>
              </div>
              <Button
                size="sm"
                asChild
                variant="outline"
                className="rounded-full"
              >
                <label
                  htmlFor="portfolioImageInput"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <PlusIcon size={16} />
                  이미지 추가
                </label>
              </Button>
            </div>

            <input
              className="hidden"
              id="portfolioImageInput"
              type="file"
              multiple
              accept="image/*"
              onChange={handlePortfolioImageChange}
            />

            {previewPortfolioUrls.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewPortfolioUrls.map((url, index) => (
                  <div
                    key={url}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50"
                  >
                    <Image
                      src={url}
                      alt={`portfolio-${index}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handlePortfolioImageDelete(index)}
                        className="h-8 w-8 rounded-full"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center text-gray-400 text-sm">
                등록된 포트폴리오 이미지가 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-8 border-t border-gray-100">
          {expertData && (
            <Button
              size="lg"
              onClick={handleClickCancel}
              variant="outline"
              className="px-8 rounded-full"
            >
              취소
            </Button>
          )}
          <Button
            size="lg"
            onClick={handleClickSubmit}
            disabled={isPending}
            className="px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExpertProfileEditModePage;
