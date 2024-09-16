export const returnProfileStatusColor = (status: string) => {
    switch (status) {
      case "public":
        return "primary";
      case "private":
        return "default";
      default:
        return "default";
    }
  };
  