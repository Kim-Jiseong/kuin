import { Avatar, Button, User } from "@nextui-org/react";
import { BookUser } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Typography from "../common/Typography";

function ExpertProfile({
  profile,
  myId,
  onClose,
}: {
  profile: any;
  myId: string | undefined;
  onClose?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between items-center">
      {/* <User
        name={profile?.name}
        description={profile?.introduction}
        avatarProps={{
          className: "flex-shrink-0",
          radius: "md",
          src: profile?.profileImage,
          isBordered: true,
        }}
      /> */}
      <div className={"w-full flex items-center gap-4 justify-between"}>
        <Avatar
          className={"flex flex-shrink-0"}
          radius="md"
          src={profile?.profileImage}
          isBordered
        />
        <div className="flex flex-col w-[calc(100%-8.5rem)]">
          <Typography variant={"text"}>{profile?.name}</Typography>
          <Typography variant={"caption"} ellipsis lines={1}>
            {profile?.introduction}
          </Typography>
        </div>
        <Button
          variant={"flat"}
          color={"success"}
          size="sm"
          startContent={<BookUser size={16} />}
          onClick={() => {
            router.push("/experts/" + myId);
            if (onClose) {
              onClose();
            }
          }}
        >
          자세히
        </Button>
      </div>
    </div>
  );
}

export default ExpertProfile;
