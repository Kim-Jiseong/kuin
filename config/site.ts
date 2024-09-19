export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "KUIN - 48시간 안에 끝나는 초단기 아웃소싱 플랫폼",
  description: "KUIN: 48시간 안에 끝나는 초단기 아웃소싱 플랫폼",
  // description: "간단한데 귀찮은일을 저렴하고 빠르게, KUIN",
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
