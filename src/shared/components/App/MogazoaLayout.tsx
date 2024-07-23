import { ReactNode, useEffect } from 'react';
import useGetMe from '@/shared/models/auth/useGetMe';
import useMe from '@/shared/store/use-me';
import Header from '../header/header';

interface MogazoaLayoutProps {
  children: ReactNode;
}

const MogazoaLayout = ({ children }: MogazoaLayoutProps) => {
  const { data: me, isSuccess: loginSuccess } = useGetMe();
  const { login } = useMe();

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
};

export default MogazoaLayout;
