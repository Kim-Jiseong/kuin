import { Avatar, Button, User } from "@nextui-org/react";
// import { BookUser } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Typography from "../common/Typography";
import ExpertProfileStausEditDropdown from "../common/ExpertProfileStausEditDropdown";
import { Tables } from "@/types/database.types";
import { updateProfileStatus } from "@/service/profile/action";

function ExpertProfile({
  profile,
  expertProfile,
  onClose,
}: {
  profile: Tables<"profile">;
  expertProfile: any;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [isInitial, setIsInitial] = useState(true);
  const [status, setStatus] = useState(profile.status);

  const handleUpdateStatus = async () => {
    await updateProfileStatus(status, profile.id);
  };

  useEffect(() => {
    if (!isInitial) {
      handleUpdateStatus();
    }
    setIsInitial(false);
  }, [status]);

  const handleRouting = (url: string) => {
    router.push(url);
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="flex w-full justify-between items-center gap-4">
      <div
        role="button"
        className={"flex items-center  w-[calc(100%-10rem)] gap-2 "}
        onClick={() => {
          handleRouting("/experts/" + profile.id);
        }}
      >
        <Avatar
          className={"flex flex-shrink-0"}
          radius="md"
          src={expertProfile?.profileImage}
          isBordered
        />
        <div className="flex flex-col w-full">
          <Typography variant={"text"}>{expertProfile?.name}</Typography>
          <Typography variant={"caption"} ellipsis lines={1}>
            {expertProfile?.introduction}
          </Typography>
        </div>
      </div>
      {/* <Button
        variant={"flat"}
        color={"success"}
        size="sm"
        startContent={<BookUser size={16} />}
        onClick={() => {
          handleRouting("/experts/" + myId);
        }}
      >
        자세히
      </Button> */}
      <ExpertProfileStausEditDropdown status={status} setStatus={setStatus} />
    </div>
  );
}

export default ExpertProfile;
