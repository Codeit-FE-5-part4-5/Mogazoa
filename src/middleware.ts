import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const checkLogin = (req: NextRequest) => {
  const token = req.cookies.get('accessToken');
  return token;
};

const redirectIfLoggedIn = (req: NextRequest) => {
  const redirectedPaths = [
    '/signup',
    '/signin',
    '/oauth/kakao',
    '/oauth/google',
  ];

  if (checkLogin(req) && redirectedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
};

const redirectIfNotLoggedIn = (req: NextRequest) => {
  const restrictedPaths = ['/mypage', '/compare'];

  if (!checkLogin(req) && restrictedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  return NextResponse.next();
};

const middleware = (req: NextRequest) => {
  let response = redirectIfLoggedIn(req);

  if (response?.status === 200) {
    response = redirectIfNotLoggedIn(req);
  }
  return response;
};

export default middleware;

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/oauth/kakao',
    '/oauth/google',
    '/mypage',
    '/compare',
  ],
};
