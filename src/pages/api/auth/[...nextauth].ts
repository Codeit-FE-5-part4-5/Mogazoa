// import NextAuth, { DefaultSession } from 'next-auth';

// import KakaoProvider from 'next-auth/providers/kakao';
// import GoogleProvider from 'next-auth/providers/google';

// declare module 'next-auth' {
//   interface Session {
//     id: string;
//     user: DefaultSession['user'];
//     accessToken?: string;
//   }
// }

// export default NextAuth({
//   providers: [
//     KakaoProvider({
//       clientId: process.env.KAKAO_CLIENT_ID!,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET!,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
// });
