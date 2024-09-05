export const returnMajorColor = (major: string) => {
  switch (major) {
    case "dev":
      return "primary";
    case "design":
      return "danger";
    default:
      return "default";
  }
};
