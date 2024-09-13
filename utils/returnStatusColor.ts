export const returnStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "danger";
      case "ongoing":
        return "primary";
      case "done":
        return "success";
      case "canceled":
        return "default";
      default:
        return "default";
    }
  };
  