import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookie } from '../utils/cookie';
import { PUBLIC_PATH } from '../constants/path';

export default function useRouterGuard() {
  const router = useRouter();
  const pathname = router.pathname;
  const token = getCookie('accessToken');

  const guardRouter = () => {
    // if (!token && !PUBLIC_PATH.includes(pathname)) {
    //   // 토큰이 없고 로그인,회원가입,메인페이지가 아닐 경우
    //   return router.replace('/signin');
    // }
  };

  useEffect(() => {
    guardRouter();
  }, [token, pathname, router]);

  return;
}
