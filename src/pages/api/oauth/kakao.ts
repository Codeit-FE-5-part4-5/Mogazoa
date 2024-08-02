import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import appendErrorToQuery from '@/lib/auth/appendErrorToQuery';
import castArray from '@/utils/castArray';

const signupRequest = async (code: string, state: string) => {
  const result = await axios.post(
    `https://mogazoa-api.vercel.app/5-5/auth/signUp/kakao`,
    {
      token: code,
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      nickname: state,
    },
  );
  return result;
};

const signinRequest = async (code: string) => {
  const result = await axios.post(
    `https://mogazoa-api.vercel.app/5-5/auth/signIn/kakao`,
    {
      token: code,
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    },
  );
  return result;
};

/**
 * - 로그인시 로직
 * 1. 프론트에서 카카오에 인가 코드 요청을 보낸다.
 * 2. 받은 인가 코드로 프론트 서버에서 백 서버에 로그인 요청을 보낸다.
 * 3. 받은 엑세스 토큰을 쿠키에 저장한다.
 * 4. 홈페이지로 리다이렉션 시킨다.
 *
 * - 회원가입시 로직
 * 1. 프론트에서 카카오에 인가 코드 요청을 보낸다.
 * 2. 받은 인가 코드로 프론트 서버에서 백 서버에 로그인 요청을 보낸다.
 * 3. 로그인 실패시 간편 회원가입 페이지로 리다이렉션 시킨다.
 * 4. 닉네임과 함께 인가 코드 요청을 다시 보낸다.
 * 5. 받은 엑세스 토큰을 쿠키에 저장한다.
 * 6. 홈페이지로 리다이렉션 시킨다.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;

  let response;
  try {
    if (!state) {
      response = await signinRequest(castArray(code));
    } else {
      response = await signupRequest(castArray(code), castArray(state));
    }

    if (response?.status === 200) {
      res
        .setHeader(
          'Set-Cookie',
          `accessToken=${response.data.accessToken}; Path=/;`,
        )
        .redirect('/');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 403) {
        res.redirect(process.env.NEXT_PUBLIC_KAKAO_SIGNUP_URI!);
      } else {
        const params = appendErrorToQuery(error);
        res.redirect(
          `${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_URI!}?${params?.toString()}`,
        );
      }
    } else {
      res.redirect(`${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_URI!}?${error}`);
    }
  }
};

export default handler;
