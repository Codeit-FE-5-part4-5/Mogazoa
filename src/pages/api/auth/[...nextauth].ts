import { signInRequest } from '@/shared/models/auth/useSignIn';
import NextAuth, { DefaultSession, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import KakaoProvider from 'next-auth/providers/kakao';

declare module 'next-auth' {
  interface Session {
    id: string;
    user: DefaultSession['user'];
    accessToken?: string;
  }
}

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const { data } = await signInRequest({ email, password });
        return data;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
  },

  callbacks: {
    //   async jwt({ token, user }: { token: JWT; user: User }) {
    //     const copyToken = { ...token }
    //     if (user) {
    //       copyToken.accessToken = user?.accessToken
    //       copyToken.id = user?.user?.id
    //     }
    //     return copyToken
    //   },
    //   async session({ session, token }: { session: Session; token: JWT }) {
    //     const copySession = { ...session }
    //     copySession.user.id = token.id
    //     copySession.accessToken = token.accessToken
    //     return copySession
    // },
  },
});
