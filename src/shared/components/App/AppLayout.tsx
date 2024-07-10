import { ReactNode, useEffect } from 'react';
import { Header } from '../header/header';
import { getCookie } from '@/shared/utils/cookie';
import useGetMe from '@/shared/models/auth/useGetMe';
import useMe from '@/shared/hooks/use-me';
import useRouterGuard from '@/shared/hooks/useRouterGuard';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const token = getCookie('accessToken');
  const { data: me, isSuccess: loginSuccess } = useGetMe(token);
  const { login } = useMe();
  // useRouterGuard();

  useEffect(() => {
    if (loginSuccess) {
      login(me.data);
    }
  }, [loginSuccess]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
