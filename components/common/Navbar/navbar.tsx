"use client";

import NextLink from "next/link";
import AvatarWrapper from "../Avatar";
import { Tables } from "@/types/database.types";
import LinkWrapper from "./LinkWrapper";
import BackButton from "./BackBtn";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = ({
  profile,
  projectList,
}: {
  profile: Tables<"profile"> | null;
  projectList: Tables<"project">[] | null;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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
          <div className="hidden md:flex">
            <LinkWrapper />
          </div>
          {profile ? (
            <AvatarWrapper profile={profile} projectList={projectList} />
          ) : (
            <Button asChild>
              <NextLink href="/auth">로그인</NextLink>
            </Button>
          )}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-background border-b md:hidden p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
          <LinkWrapper
            className="flex-col ml-0 gap-4"
            onLinkClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
};
