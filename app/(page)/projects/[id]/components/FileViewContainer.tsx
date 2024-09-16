"use client";
import Typography from "@/components/common/Typography";
import { FileObj } from "@/types/database.types";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import FileViewBtn from "./FileViewBtn";

function FileViewContainer({ fileList }: { fileList: FileObj[] | null }) {
  return (
    <div className={`w-full flex flex-col gap-2 `}>
      {fileList && fileList.length > 0 && (
        <Typography variant="subtitle2" className={"text-md"}>
          첨부파일
        </Typography>
      )}
      <div className={`w-full flex gap-2 flex-wrap`}>
        {fileList &&
          fileList.map((file, index) => (
            // <Card
            //   key={index}
            //   className={`w-fit
            //     cursor-pointer hover:bg-content2
            //     rounded-md`}
            // >
            //   <CardBody
            //     onClick={() => {
            //       downloadFile(file);
            //     }}
            //   >
            //     <li className="flex justify-between items-center">
            //       <Typography
            //         variant="text"
            //         style={{ fontSize: 14 }}
            //         ellipsis
            //         lines={1}
            //       >
            //         {file.name + "/" + file.name.split(".").pop()}
            //       </Typography>
            //     </li>
            //   </CardBody>
            // </Card>
            <FileViewBtn key={index} file={file} />
          ))}
      </div>
    </div>
  );
}

export default FileViewContainer;
