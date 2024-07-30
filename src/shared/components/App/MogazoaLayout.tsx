import { PropsWithChildren } from 'react';
import Header from '../header/header';

const MogazoaLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MogazoaLayout;
