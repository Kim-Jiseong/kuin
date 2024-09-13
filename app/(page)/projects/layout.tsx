import FullPageSpinner from "@/components/common/FullPageSpinner";
import { Suspense } from "react";

// layouts/MainLayout.js
const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <main>{children}</main>
    </Suspense>
  );
};

export default ProjectLayout;
