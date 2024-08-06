import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';

const getServerCookie = (
  context: GetServerSidePropsContext,
  cookieName: string,
) => {
  const cookies = cookie.parse(context.req.headers.cookie!);
  const cookieValue = cookies[cookieName];

  return cookieValue;
};

export default getServerCookie;
