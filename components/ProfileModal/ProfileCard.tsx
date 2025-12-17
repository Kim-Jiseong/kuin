"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Typography from "../common/Typography";
import { LogOut, Pencil } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";
import { signOut } from "@/app/auth/login/action";
import { updateProfile } from "@/service/profile/action";

function ProfileCard({
  profile,
  onClose,
}: {
  profile: Tables<"profile"> | null;
  onClose: () => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [previewName, setPreviewName] = useState<string | null | undefined>(
    profile?.name
  );
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    mutate: updateUserMutate,
    mutateAsync: updateUserMutateAsync,
    isPending: isPendingUser,
    status: updateUserStatus,
  } = useMutation({
    mutationFn: async (url: string | undefined) => {
      if (profile) {
        const updatedProfile = await updateProfile(profile?.id, {
          name: previewName,
          image: url
            ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${url}`
            : profile.image,
        });
        // console.log("updatedProfile", updatedProfile);
        return updatedProfile;
      }
    },
    onSuccess: async (data) => {
      // console.log("User Updated", data);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const supabase = createClient();
    const fileExt = image.name.split(".").pop();
    const fileName = `profile-${Date.now()}.${fileExt}`;
    const filePath = `profile/${profile?.id}/${fileName}`;

    const { error, data } = await supabase.storage
      .from("profile")
      .upload(filePath, image, { cacheControl: "3500", upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
    } else {
      console.log("File uploaded successfully:", data);
      return data.fullPath;
    }
  };

  const handleClickUpdate = async () => {
    try {
      setUpdateLoading(true);
      const filePath = await handleUpload();
      const updatedProfile = await updateUserMutateAsync(filePath);
    } catch (e) {
      console.log(e);
      alert("Error: 프로필 정보 저장에 실패했습니다");
    } finally {
      setPreviewUrl(null);
      setImage(null);
      setUpdateLoading(false);
      setEditMode(false);
    }
  };
  const handleClickCancel = () => {
    setPreviewUrl(null);
    setImage(null);
    setEditMode(false);
  };
  if (!profile) return null;
  else
    return (
      <Card>
        <CardHeader>계정</CardHeader>
        <CardContent>
          <div
            className="w-full flex flex-col justify-center items-center gap-4 
            "
          >
            <div className="flex flex-col items-center gap-2 ">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={previewUrl ? previewUrl : (profile?.image as string)}
                />
                <AvatarFallback>
                  {profile?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {editMode && (
                <div>
                  <label
                    htmlFor="profileImageInput"
                    className={"cursor-pointer"}
                  >
                    <Typography variant="caption" color={"primary"}>
                      사진 수정하기
                    </Typography>{" "}
                  </label>
                  <input
                    className={"hidden"}
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1 text-center">
                {editMode ? (
                  <Input
                    onChange={(e) => setPreviewName(e.target.value)}
                    className="h-8"
                    defaultValue={profile.name as string}
                  />
                ) : (
                  <Typography variant="text" ellipsis lines={1}>
                    {profile?.name}
                  </Typography>
                )}
                <Typography variant="caption" ellipsis lines={1}>
                  {profile?.email}
                </Typography>
              </div>
            </div>
            {editMode ? (
              <div className="flex gap-2 ">
                <Button size="sm" variant="outline" onClick={handleClickCancel}>
                  취소
                </Button>
                <Button
                  size="sm"
                  onClick={handleClickUpdate}
                  disabled={updateLoading}
                >
                  저장
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 ">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditMode(true)}
                >
                  <Pencil size={16} className="mr-2" />
                  계정 정보 수정
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={async () => {
                    await signOut();
                    onClose();
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  로그아웃
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
}

export default ProfileCard;
