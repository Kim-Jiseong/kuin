// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
    expires: string;
    access_token: string;
    id_token: string;
    provider: string;
    profile: {
      id: string;
      created_at: string;
      name: string;
      email: string;
      image: string;
      profile: any;
      isNewUser: boolean;
    };
  }
}
