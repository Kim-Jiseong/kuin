import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
// import {
//   TwitterIcon,
//   GithubIcon,
//   DiscordIcon,
//   HeartFilledIcon,
//   SearchIcon,
//   Logo,
// } from "@/components/icons";
import AvatarWrapper from "../Avatar";
import { Tables } from "@/types/database.types";
import LinkWrapper from "./LinkWrapper";
import BackButton from "./BackBtn";

export const Navbar = ({
  profile,
  projectList,
}: {
  profile: Tables<"profile"> | null;
  projectList: Tables<"project">[] | null;
}) => {
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isBordered
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full flex gap-2"
        justify="start"
      >
        <BackButton />
        <NavbarBrand as="li" className="gap-2 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">KUIN</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className=" sm:flex basis-1/5 sm:basis-full" justify="end">
        <LinkWrapper />
        <AvatarWrapper profile={profile} projectList={projectList} />
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
