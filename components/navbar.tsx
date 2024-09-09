import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "../config/site";
// import {
//   TwitterIcon,
//   GithubIcon,
//   DiscordIcon,
//   HeartFilledIcon,
//   SearchIcon,
//   Logo,
// } from "@/components/icons";
import AvatarWrapper from "./common/Avatar";
import { createClient } from "../utils/supabase/server";
import { Tables } from "@/types/database.types";

export const Navbar = ({
  profile,
}: {
  profile: Tables<"profile">[] | null;
}) => {
  // const supabase = createClient();
  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();

  // const { data: profile, error: profileError } = user
  //   ? await supabase.from("profile").select("*").eq("user_id", user.id)
  //   : { data: null, error: null };

  // console.log("여기", session, sessionError, user, error);
  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">KUIN</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className=" sm:flex basis-1/5 sm:basis-full" justify="end">
        <ul className="flex gap-4 justify-end ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <AvatarWrapper
          profile={profile && profile.length > 0 ? profile[0] : null}
        />
      </NavbarContent>

      {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent> */}

      {/* <NavbarMenu>
        <SearchInput />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                // color={
                //   index === 2
                //     ? "primary"
                //     : index === siteConfig.navMenuItems.length - 1
                //       ? "danger"
                //       : "foreground"
                // }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}
    </NextUINavbar>
  );
};
