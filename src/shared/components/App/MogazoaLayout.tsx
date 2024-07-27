import { ReactNode } from 'react';
import useGetMe from '@/shared/models/auth/useGetMe';
import Header from '../header/header';

interface MogazoaLayoutProps {
  children: ReactNode;
}

const MogazoaLayout = ({ children }: MogazoaLayoutProps) => {
  const { data } = useGetMe();
  return (
    <>
      <Header me={data?.data} />
      {children}
    </>
  );
};

export default MogazoaLayout;
