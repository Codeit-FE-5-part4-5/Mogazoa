import { PropsWithChildren } from 'react';
import Nav from '../Nav/Nav';

const MogazoaLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Nav />
      <div className="pt-[80px]">{children}</div>
    </>
  );
};

export default MogazoaLayout;
