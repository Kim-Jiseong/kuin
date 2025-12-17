import NextLink from "next/link";
import AvatarWrapper from "../Avatar";
import { Tables } from "@/types/database.types";
import LinkWrapper from "./LinkWrapper";
import BackButton from "./BackBtn";
import { Button } from "@/components/ui/button";

export const Navbar = ({
  profile,
  projectList,
}: {
  profile: Tables<"profile"> | null;
  projectList: Tables<"project">[] | null;
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 max-w-screen-xl items-center px-4">
        <div className="flex items-center gap-2 flex-1">
          <BackButton />
          <NextLink href="/" className="flex items-center gap-2">
            <span className="font-bold">KUIN</span>
          </NextLink>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <LinkWrapper />
          {profile ? (
            <AvatarWrapper profile={profile} projectList={projectList} />
          ) : (
            <Button asChild>
              <NextLink href="/auth">로그인</NextLink>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
