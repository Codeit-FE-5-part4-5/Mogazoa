import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import appendErrorToQuery from '@/lib/auth/appendErrorToQuery';
import castArray from '@/utils/castArray';
import getGoogleIdToken from '@/lib/auth/getGoogleIdToken';

const signupRequest = async (params: { code: string; nickname: string }) => {
  const result = await axios.post(
    `https://mogazoa-api.vercel.app/5-5/auth/signUp/google`,
    {
      token: params.code,
      redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      nickname: params.nickname,
    },
  );
  return result;
};

const signinRequest = async (code: string) => {
  const result = await axios.post(
    `https://mogazoa-api.vercel.app/5-5/auth/signIn/google`,
    {
      token: code,
      redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
    },
  );
  return result;
};

/**
 *  구글 로그인 || 회원가입 로직
 * 1. 구글 인가코드를 받기 위해 리다이렉트 URI와 필요한 값을 넘긴다.
 * 2. 리다이렉트 URI의 데이터 처리 로직을 실행시킨다.
 * 3. 받은 인가코드를 이용해 idToken을 받는다.
 * 4. idToken으로 로그인 요청을 보낸다.
 * 5. 미가입 회원이라면 idToken으로 가입 요청을 보낸다
 * 6. 엑세스 토큰을 쿠키에 저장한뒤 메인 페이지로 리다이렉션 한다.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, nickname } = req.query;

  let idToken;
  let response;
  try {
    if (code) {
      const idTokenResponse = await getGoogleIdToken(castArray(code));
      if (idTokenResponse?.status === 200) {
        idToken = idTokenResponse.data.id_token;
      }
    }

    if (!nickname) {
      response = await signinRequest(idToken);
    } else {
      idToken = req.cookies.idToken;
      response = await signupRequest({
        nickname: castArray(nickname),
        code: castArray(idToken),
      });
    }

    if (response?.status === 200) {
      res
        .setHeader('Set-Cookie', [
          `accessToken=${response.data.accessToken}; Path=/;`,
          `idToken=; Path=/; Max-Age=0;`,
        ])
        .redirect('/');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 403) {
        res
          .setHeader('Set-Cookie', `idToken=${idToken}; Path=/;`)
          .redirect(process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_URI!);
      } else {
        const params = appendErrorToQuery(error);
        res.redirect(
          `${process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_URI!}?${params?.toString()}`,
        );
      }
    } else {
      res.redirect(`${process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_URI!}?${error}`);
    }
  }
};

export default handler;
