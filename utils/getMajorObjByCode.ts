import { major } from "@/constant/major";

export const getMajorObjByCode = (code: string) => {
  const majorItem = major.find((item) => item.code === code);
  return majorItem ? majorItem : null;
};
