/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // 개발 환경에서 Invalid source map 로그 제거
  productionBrowserSourceMaps: false,

  // 성능 최적화 설정
  experimental: {
    // Turbopack 파일 시스템 캐싱 - 개발 환경 컴파일 속도 대폭 개선
    turbopackFileSystemCacheForDev: true,

    // 클라이언트 라우터 캐시 최적화 - 동적 페이지 캐시 시간 설정
    staleTimes: {
      dynamic: 30, // 동적 페이지 30초 캐시
      static: 180, // 정적 페이지 3분 캐시
    },
    // 패키지 최적화 - 트리셰이킹 개선
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "date-fns",
      "date-fns-tz",
    ],
  },
};

export default nextConfig;
