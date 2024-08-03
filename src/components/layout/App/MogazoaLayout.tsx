import { PropsWithChildren } from 'react';
import Nav from '../Nav/Nav';

const MogazoaLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default MogazoaLayout;
