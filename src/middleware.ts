import { type NextRequest, NextResponse } from 'next/server';
import { AUTH_RESTRICTED_ROUTES, PROTECTED_ROUTES } from './constants/path';

/**
 * @summary 쿠키의 accessToken여부로 로그인을 판단합니다.
 */
const checkLogin = (req: NextRequest) => {
  const token = req.cookies.get('accessToken');
  return token;
};

/**
 * @summary 로그인 상태일때 들어가면 안되는 곳 보호 하는 함수
 *
 * 로그인 상태에서 들어갈 수 없는 페이지를 정의하고
 * 메인페이지로 리다이렉션 합니다.
 * 정상적인 접근일 경우, 해당 함수는 200 상태코드를 포함한 req를 다음 미들웨어로 패스합니다.
 */
const redirectIfLoggedIn = (req: NextRequest) => {
  if (
    checkLogin(req) &&
    AUTH_RESTRICTED_ROUTES.includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
};

/**
 * @summary 비로그인 상태일때 들어가면 안되는 곳 보호 하는 함수
 *
 * 로그인 되어 있지 않은 상태에서 들어갈 수 없는 페이지를 정의하고
 * 로그인 페이지로 내쫒는 로직을 포함합니다.
 * 정상적인 접근일 경우, 해당 함수는 200 상태코드를 포함한 req를 다음 미들웨어로 패스합니다.
 */
const redirectIfNotLoggedIn = (req: NextRequest) => {
  if (!checkLogin(req) && PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  return NextResponse.next();
};

/**
 * @summary 위에 정의한 미들웨어 들에서 순서대로 검사하고 리스폰스를 반환하는 미들웨어 함수
 *
 * 만약 미들웨어에 걸리지 않고 무사 통과하면 상태 코드 200을 뱉습니다.
 */
const middleware = (req: NextRequest) => {
  let response = redirectIfLoggedIn(req);

  if (response?.status === 200) {
    response = redirectIfNotLoggedIn(req);
  }

  return response;
};

/**
 * @summary 본 미들웨어를 적용시킬 페이지 목록입니다.
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

export default middleware;
