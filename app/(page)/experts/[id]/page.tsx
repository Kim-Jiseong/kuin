"use client";
import Typography from "@/components/common/Typography";
import { getUser } from "@/service/user/user";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExpertProfileEditModePage from "./components/expertProfileEditModePage";
import ExpertProfileViewModePage from "./components/expertProfileViewModePage";
import { Spinner } from "@nextui-org/react";
type Props = {
  params: {
    id: string;
  };
};

function ExpertDetail({ params }: Props) {
  const {
    data: userData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["expert", params.id],
    queryFn: () => getUser(params.id),
  });
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!userData?.expert_profile) {
      setEditMode(userData?.id === session?.profile.id ? true : false);
    } else {
      setEditMode(false);
    }
  }, [userData]);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">
      {isPending ? (
        <div
          className={
            "w-full h-[50vh] flex flex-col items-center justify-center"
          }
        >
          <Spinner />
        </div>
      ) : editMode ? (
        <ExpertProfileEditModePage
          userData={userData}
          setEditMode={setEditMode}
          session={session}
          updateSession={updateSession}
          refetch={refetch}
        />
      ) : (
        <ExpertProfileViewModePage
          userData={userData}
          setEditMode={setEditMode}
          session={session}
        />
      )}
    </div>
  );
}

export default ExpertDetail;
