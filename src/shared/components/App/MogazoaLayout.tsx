import { PropsWithChildren } from 'react';
import useGetMe from '@/shared/models/auth/useGetMe';
import Portal from '@/Portal';
import Header from '../header/header';
import Floating from '../Floating/Floating';

const MogazoaLayout = ({ children }: PropsWithChildren) => {
  const { data } = useGetMe();
  return (
    <>
      <Header me={data?.data} />
      {children}
      <Portal portalName="floating">
        <Floating me={data?.data} />
      </Portal>
    </>
  );
};

export default MogazoaLayout;
