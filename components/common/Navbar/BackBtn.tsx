"use client";
import { Button } from "@nextui-org/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Button onPress={goBack} size="sm" isIconOnly variant={"light"}>
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
