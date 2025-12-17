"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Button onClick={goBack} size="sm" className="h-8 w-8 p-0" variant="ghost">
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
