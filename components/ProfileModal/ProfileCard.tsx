"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState, useTransition } from "react";
import Typography from "../common/Typography";
import { LogOut, Pencil, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
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
  const [isPending, startTransition] = useTransition();
  const [previewName, setPreviewName] = useState<string | null | undefined>(
    profile?.name
  );
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    if (!profile) return;

    startTransition(async () => {
      try {
        const filePath = await handleUpload();
        await updateProfile(profile.id, {
          name: previewName,
          image: filePath
            ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${filePath}`
            : profile.image,
        });
      } catch (e) {
        console.log(e);
        alert("Error: 프로필 정보 저장에 실패했습니다");
      } finally {
        setPreviewUrl(null);
        setImage(null);
        setEditMode(false);
      }
    });
  };

  const handleClickCancel = () => {
    setPreviewUrl(null);
    setImage(null);
    setEditMode(false);
  };

  if (!profile) return null;
  console.log(profile);
  return (
    <Card>
      <CardHeader>계정</CardHeader>
      <CardContent>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-border shadow-sm">
              <AvatarImage
                src={previewUrl ?? (profile?.image as string)}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
                {profile?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {editMode && (
              <div className="flex flex-col items-center gap-2">
                <label
                  htmlFor="profileImageInput"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">
                    <Pencil size={14} />
                    <Typography variant="caption" className="font-medium">
                      사진 변경
                    </Typography>
                  </div>
                </label>
                <input
                  className="hidden"
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            )}

            <div className="flex flex-col gap-1 text-center w-full max-w-[200px]">
              {editMode ? (
                <div className="space-y-1">
                  <Input
                    onChange={(e) => setPreviewName(e.target.value)}
                    className="h-9 text-center font-medium"
                    defaultValue={profile.name as string}
                    placeholder="이름"
                  />
                  <Typography
                    variant="caption"
                    className="text-muted-foreground"
                  >
                    {profile?.email}
                  </Typography>
                </div>
              ) : (
                <>
                  <Typography variant="subtitle2" className="text-lg font-bold">
                    {profile?.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-muted-foreground"
                    ellipsis
                    lines={1}
                  >
                    {profile?.email}
                  </Typography>
                </>
              )}
            </div>
          </div>
          {editMode ? (
            <div className="flex gap-2 w-full pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleClickCancel}
                className="flex-1 hover:bg-muted/80"
              >
                취소
              </Button>
              <Button
                size="sm"
                onClick={handleClickUpdate}
                disabled={isPending}
                className="flex-1"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                저장
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 w-full pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditMode(true)}
                className="flex-1 hover:bg-muted/80 group"
              >
                <Pencil
                  size={14}
                  className="mr-2 group-hover:text-primary transition-colors"
                />
                정보 수정
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="flex-1 hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
              >
                <LogOut size={14} className="mr-2" />
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
