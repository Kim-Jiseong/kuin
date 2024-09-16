"use client";
import Typography from "@/components/common/Typography";
import { FileObj } from "@/types/database.types";
import { returnFileFormatObj } from "@/utils/returnFileFormatObj";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";

function FileViewBtn({ file }: { file: FileObj }) {
  const [isPending, setIsPending] = useState(false);
  const fileFormatObj = returnFileFormatObj(file.name.split(".").pop());
  const downloadFile = async () => {
    try {
      setIsPending(true);
      const response = await fetch(file.fullPath);

      if (!response.ok) {
        throw new Error("파일을 가져오는 데 실패했습니다.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();

      // 다운로드 후 링크 제거
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      onPress={downloadFile}
      isLoading={isPending}
      color={fileFormatObj.color}
      size="sm"
      startContent={!isPending && fileFormatObj.icon}
    >
      <Typography variant="text" style={{ fontSize: 14 }} ellipsis lines={1}>
        {file.name}
      </Typography>
    </Button>
  );
}

export default FileViewBtn;
