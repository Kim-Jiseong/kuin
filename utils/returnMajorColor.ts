export const returnMajorColor = (major: string | null | undefined) => {
  switch (major) {
    case "dev":
      return "primary";
    case "design":
      return "danger";
    default:
      return "default";
  }
};
