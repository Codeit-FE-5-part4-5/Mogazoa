export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/compare', '/mypage', '/user/:path*'],
};
