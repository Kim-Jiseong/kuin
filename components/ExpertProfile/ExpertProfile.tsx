import { Button, User } from "@nextui-org/react";
import { BookUser } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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
      <User
        name={profile?.name}
        description={profile?.introduction}
        avatarProps={{
          radius: "md",
          src: profile?.profileImage,
          isBordered: true,
        }}
      />
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
  );
}

export default ExpertProfile;
