import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';

const getServerCookie = (
  context: GetServerSidePropsContext,
  cookieName: string,
) => {
  const someCookie = context.req.cookies[cookieName];
  const cookies = cookie.parse(someCookie!);

  return cookies;
};

export default getServerCookie;
