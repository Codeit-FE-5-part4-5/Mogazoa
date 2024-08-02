import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import { isServer } from '@tanstack/react-query';

const getServerToken = (context: GetServerSidePropsContext) => {
  if (isServer) {
    const cookieHeader = context.req.headers.cookie || '';
    const cookies = cookie.parse(cookieHeader);
    const { accessToken } = cookies;

    return accessToken;
  }
  return '';
};

export default getServerToken;
