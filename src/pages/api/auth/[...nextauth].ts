import NextAuth, { DefaultSession, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import KakaoProvider from 'next-auth/providers/kakao';

declare module 'next-auth' {
  interface Session {
    id: string;
    user: DefaultSession['user'];
  }
}

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      session.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
