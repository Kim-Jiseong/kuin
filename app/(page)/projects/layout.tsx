// import FullPageSpinner from "@/components/common/FullPageSpinner";
import { Metadata } from "next";
// import { Suspense } from "react";
export const metadata: Metadata = {
  title: "KUIN-프로젝트 찾기",
  alternates: {
    canonical: "https://kuin.me/projects",
  },
  openGraph: {
    title: "KUIN-프로젝트 찾기",
    description: "KUIN-프로젝트 찾기",
    url: "https://kuin.me/projects",
  },
};

// layouts/MainLayout.js
const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <Suspense fallback={<FullPageSpinner />}>
    <main className="container mx-auto w-full max-w-7xl px-6 flex-grow min-h-[calc(100vh-4rem)]">
      {children}
    </main>
    // </Suspense>
  );
};

export default ProjectLayout;
