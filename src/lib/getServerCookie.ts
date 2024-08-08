import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';

const getServerCookie = (
  context: GetServerSidePropsContext,
  cookieName: string,
) => {
  const cookieHeader = context.req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookie.parse(cookieHeader);
    const cookieValue = cookies[cookieName];
    return cookieValue;
  }
  return null;
};

export default getServerCookie;
