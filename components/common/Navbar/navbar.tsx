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
    <>
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
              className="md:hidden p-2 text-foreground relative w-10 h-10 flex items-center justify-center"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
                    isMenuOpen
                      ? "opacity-0 rotate-90 scale-50"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
                    isMenuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 top-12 z-30 bg-black/50 transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-12 left-0 w-full bg-background border-b border-t md:hidden p-6 flex flex-col gap-6 shadow-lg z-40 items-center origin-top transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible pointer-events-none"
        }`}
      >
        <LinkWrapper
          className="flex-col ml-0 gap-6 items-center w-full"
          onLinkClick={() => setIsMenuOpen(false)}
        />
      </div>
    </>
  );
};
