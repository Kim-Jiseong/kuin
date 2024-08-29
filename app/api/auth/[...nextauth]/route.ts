import { getOrCreateUser } from "@/utils/getOrCreateUser";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.id_token = token.id_token;
      session.provider = token.provider;
      session.user = token.user;
      session.profile = token.profile;
      return session;
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.refresh_token = account.refresh_token;
        token.provider = account.provider;
        token.user = user;

        // getOrCreateUser 호출
        const { user: dbUser, isNewUser } = await getOrCreateUser({
          name: user?.name,
          email: user?.email,
          image: user?.image,
          provider: account.provider,
        });

        // User 정보를 토큰에 저장
        token.profile = { ...dbUser, isNewUser };
      }
      return token;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "/auth",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
