export const returnStatusColor = (status: string) => {
    switch (status) {
      case "on_progress":
        return "primary";
      case "finished":
        return "success";
      case "cancelled":
        return "default";
      default:
        return "default";
    }
  };
  