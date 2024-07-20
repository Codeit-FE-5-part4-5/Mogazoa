import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirectIfLoggedIn = (req: NextRequest) => {
  const token = req.cookies.get('accessToken');

  if (token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
};

const restrictPath = (req: NextRequest) => {
  const restrictedPaths = ['/mypage', '/compare'];

  if (restrictedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  return NextResponse.next();
};

const middleware = (req: NextRequest) => {
  let response = redirectIfLoggedIn(req);

  if (response?.status === 200) {
    response = restrictPath(req);
  }
  return response;
};

export default middleware;
export const config = {
  matcher: ['/signin', '/signup', '/oauth/:path*', '/mypage', '/compare'],
};
