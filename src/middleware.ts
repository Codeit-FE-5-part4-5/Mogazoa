import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * @description
 * 로그인 여부에 따른 리다이렉션 로직을 포함합니다.
 * 쿠키의 accessToken여부로 로그인을 판단합니다.
 */

const protectedRoutes = ['/mypage', '/compare'];
const authRestrictedRoutes = [
  '/signup',
  '/signin',
  '/oauth/kakao',
  '/oauth/google',
];

const checkLogin = (req: NextRequest) => {
  const token = req.cookies.get('accessToken');
  return token;
};

const redirectIfLoggedIn = (req: NextRequest) => {
  /**
   * @description
   * 로그인 상태에서 들어갈 수 없는 페이지를 정의하고
   * 메인페이지로 리다이렉션 합니다.
   * 정상적인 접근일 경우, 해당 함수는 200 상태코드를 포함한 req를 다음 미들웨어로 패스합니다.
   */

  if (checkLogin(req) && authRestrictedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
};

const redirectIfNotLoggedIn = (req: NextRequest) => {
  /**
   * @description
   * 로그인 되어 있지 않은 상태에서 들어갈 수 없는 페이지를 정의하고
   * 로그인 페이지로 내쫒는 로직을 포함합니다.
   * 정상적인 접근일 경우, 해당 함수는 200 상태코드를 포함한 req를 다음 미들웨어로 패스합니다.
   */

  if (!checkLogin(req) && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  return NextResponse.next();
};

const middleware = (req: NextRequest) => {
  /**
   * @description
   * 위에 정의한 함수들을 한데 모아 middleware에서 조립합니다.
   */
  let response = redirectIfLoggedIn(req);

  if (response?.status === 200) {
    response = redirectIfNotLoggedIn(req);
  }
  return response;
};

export default middleware;

/**
 * @description
 * 본 미들웨어를 적용시킬 페이지 목록입니다.
 */
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
