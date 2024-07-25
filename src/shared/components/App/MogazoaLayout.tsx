import { ReactNode } from 'react';
import useGetMe from '@/shared/models/auth/useGetMe';
import Header from '../header/header';

interface MogazoaLayoutProps {
  children: ReactNode;
}

const MogazoaLayout = ({ children }: MogazoaLayoutProps) => {
  useGetMe();

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MogazoaLayout;
