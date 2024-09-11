export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "KUIN - 간단한데 귀찮은 일을 저렴하고 빠르게 아웃소싱하세요",
  description: "KUIN: 간단한데 귀찮은 일을 저렴하고 빠르게 아웃소싱하세요",
  // description: "대학생과 함께하는 빠르고 합리적인 프로젝트 매칭 플랫폼, KUIN",
  navItems: [
    {
      label: "프로젝트",
      href: "/projects",
    },
    {
      label: "전문가",
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
