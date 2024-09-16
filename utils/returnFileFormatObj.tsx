import {
  Clapperboard,
  FileImage,
  FileText,
  KeySquare,
  Music,
  PenTool,
  Presentation,
  Video,
} from "lucide-react";

export type FileFormatObj = {
  fileType: string;
  icon: JSX.Element;
  color: "danger" | "primary" | "default" | "success" | "warning" | "secondary";
};

export const returnFileFormatObj: (
  fileType: string | undefined
) => FileFormatObj = (fileType: string | undefined) => {
  switch (fileType) {
    case "pdf":
      return { fileType: "pdf", icon: <FileText size={18} />, color: "danger" };
    case "ai":
      return {
        fileType: "ai",
        icon: <PenTool size={18} />,
        color: "warning",
      };
    case "psd":
      return {
        fileType: "psd",
        icon: <PenTool size={18} />,
        color: "primary",
      };
    case "hwp":
      return {
        fileType: "hwp",
        icon: <FileText size={18} />,
        color: "default",
      };
    case "xlsx":
      return {
        fileType: "xlsx",
        icon: <FileText size={18} />,
        color: "success",
      };
    case "doc":
      return {
        fileType: "doc",
        icon: <FileText size={18} />,
        color: "primary",
      };
    case "docx":
      return {
        fileType: "docx",
        icon: <FileText size={18} />,
        color: "primary",
      };
    case "pptx":
      return {
        fileType: "pptx",
        icon: <Presentation size={18} />,
        color: "danger",
      };
    case "png":
      return {
        fileType: "png",
        icon: <FileImage size={18} />,
        color: "default",
      };
    case "gif":
      return {
        fileType: "gif",
        icon: <FileImage size={18} />,
        color: "default",
      };
    case "jpg":
      return {
        fileType: "jpg",
        icon: <FileImage size={18} />,
        color: "default",
      };
    case "jpeg":
      return {
        fileType: "jpeg",
        icon: <FileImage size={18} />,
        color: "default",
      };
    case "svg":
      return {
        fileType: "svg",
        icon: <PenTool size={18} />,
        color: "default",
      };
    case "mp3":
      return {
        fileType: "mp3",
        icon: <Music size={18} />,
        color: "default",
      };
    case "mp4":
      return {
        fileType: "mp4",
        icon: <Clapperboard size={18} />,
        color: "default",
      };
    case "avi":
      return {
        fileType: "avi",
        icon: <Clapperboard size={18} />,
        color: "default",
      };
    case "mov":
      return {
        fileType: "mov",
        icon: <Clapperboard size={18} />,
        color: "default",
      };
    case "pem":
      return {
        fileType: "pem",
        icon: <KeySquare size={18} />,
        color: "default",
      };
    default:
      return {
        fileType: "unknown",
        icon: <FileText size={18} />,
        color: "default",
      };
  }
};
