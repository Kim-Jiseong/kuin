export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "KUIN - 대학생과 함께하는 빠르고 합리적인 프로젝트 매칭 플랫폼",
  description: "대학생과 함께하는 빠르고 합리적인 프로젝트 매칭 플랫폼, KUIN",
  navItems: [
    {
      label: "프로젝트",
      href: "/projects",
    },
    {
      label: "인력풀",
      href: "/experts",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
