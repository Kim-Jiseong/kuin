# Kuin - 프리랜서 플랫폼

외주 프로젝트와 전문가를 연결하는 플랫폼입니다.

## 기술 스택

### Core
- [Next.js 16](https://nextjs.org/) - React 19, App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [Supabase](https://supabase.com/) - Database, Auth, Storage

### UI & Styling
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- [Framer Motion](https://www.framer.com/motion/) - Animations

### State Management & Data
- [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- [TanStack Query](https://tanstack.com/query) - Data fetching & caching

### Development
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 시작하기

### 의존성 설치

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_STORAGE_URL=your_storage_url
NEXT_PUBLIC_SITE_URL=your_site_url
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
kuin-app/
├── app/                    # Next.js App Router
│   ├── (page)/            # Public pages
│   ├── api/               # API routes
│   └── auth/              # Authentication pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── common/           # Shared components
├── utils/                 # Utility functions
│   └── supabase/         # Supabase clients
├── stores/               # Zustand stores
├── styles/               # Global styles
├── types/                # TypeScript types
└── public/               # Static files
```

## 주요 기능

- 🔐 Supabase Auth (OAuth, Email/Password)
- 📦 Supabase Storage (파일 업로드)
- 🎨 Dark Mode 지원
- 📱 반응형 디자인
- ⚡ Server Components & Server Actions
- 🔍 검색 및 필터링
- 📊 프로필 및 프로젝트 관리

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
