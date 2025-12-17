import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface FileObj {
  fullPath: string;
  name: string;
  size: number;
  lastModified: number;
}
