"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Typography from "../common/Typography";
import { LogOut, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/service/user/user";
import { Session } from "next-auth";

function ProfileCard({
  session,
  updateSession,
}: {
  session: Session | null;
  updateSession: any;
}) {
  // const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [previewName, setPreviewName] = useState<string | undefined>(
    session?.profile?.name
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
      if (session) {
        const updatedProfile = await updateUser(session?.profile?.id, {
          name: previewName,
          image: url
            ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${url}`
            : session.profile.image,
        });
        console.log("updatedProfile", updatedProfile);
        return updatedProfile;
      }
    },
    onSuccess: async (data) => {
      console.log("User Updated", data);
      updateSession();
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

    const fileExt = image.name.split(".").pop();
    const fileName = `profile-${Date.now()}.${fileExt}`;
    const filePath = `profile/${session?.profile?.id}/${fileName}`;

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
  if (!session) return null;
  else
    return (
      <Card>
        <CardHeader>계정</CardHeader>
        <CardBody>
          <div
            className="w-full flex flex-col justify-center items-center gap-4 
            "
          >
            <div className="flex flex-col items-center gap-2 ">
              <Avatar
                size={"lg"}
                isBordered
                src={
                  previewUrl ? previewUrl : (session.profile?.image as string)
                }
                className="flex-shrink-0"
              />
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
                    onValueChange={setPreviewName}
                    size={"sm"}
                    defaultValue={session.profile?.name}
                  />
                ) : (
                  <Typography variant="text" ellipsis lines={1}>
                    {session.profile?.name}
                  </Typography>
                )}
                <Typography variant="caption" ellipsis lines={1}>
                  {session.profile?.email}
                </Typography>
              </div>
            </div>
            {editMode ? (
              <div className="flex gap-2 ">
                <Button
                  size="sm"
                  color={"default"}
                  variant="flat"
                  onPress={handleClickCancel}
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  color={"primary"}
                  variant="flat"
                  onPress={handleClickUpdate}
                  isLoading={updateLoading}
                >
                  저장
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 ">
                <Button
                  size="sm"
                  color={"success"}
                  variant="flat"
                  startContent={<Pencil size={16} />}
                  onPress={() => setEditMode(true)}
                >
                  계정 정보 수정
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  startContent={<LogOut size={16} />}
                  onPress={() => signOut()}
                >
                  로그아웃
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    );
}

export default ProfileCard;
