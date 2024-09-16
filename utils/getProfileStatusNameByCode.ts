
export const getProfileStatusNameByCode = (code: string) => {
    switch (code) {
        case "public":
          return "공개";
        case "private":
          return "비공개";
        default:
          return "공개";
      }
  };
  