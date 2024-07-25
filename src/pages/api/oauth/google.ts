import getGoogleIdToken from '@/shared/models/auth/getGoogleIdToken';
import appendErrorToQuery from '@/shared/utils/appendErrorToQuery';
import validateArray from '@/shared/utils/validateArray';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, nickname } = req.query;
  const { authCode } = req.cookies || '';

  let idTokenResponse;
  let idToken;
  let response;
  try {
    if (code) {
      idTokenResponse = await getGoogleIdToken(validateArray(code));
      if (idTokenResponse?.status === 200) {
        idToken = idTokenResponse.data.id_token;
      }
    } else {
      idTokenResponse = await getGoogleIdToken(validateArray(authCode));
      if (idTokenResponse?.status === 200) {
        idToken = idTokenResponse.data.id_token;
      }
    }

    if (!nickname) {
      response = await signinRequest(idToken);
    } else {
      response = await signupRequest({
        nickname: validateArray(nickname),
        code: validateArray(idToken),
      });
    }

    if (response?.status === 200) {
      res
        .setHeader(
          'Set-Cookie',
          `accessToken=${response.data.accessToken}; Path=/;`,
        )
        .redirect('/')
        .removeHeader('authCode');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 403) {
        res
          .setHeader('Set-Cookie', `authCode=${code}; Path=/;`)
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

/**
 *  구글 로그인 || 회원가입 로직
 * 1. 구글 인가코드를 받기 위해 리다이렉트 URI와 필요한 값을 넘긴다.
 * 2. 리다이렉트 URI의 데이터 처리 로직을 실행시킨다.
 * 3. 가입여부 상관없이 받은 인가코드를 이용해 idToken을 받는다.
 * 4. idToken으로 로그인 요청을 보내어 가입 여부를 판단한다.
 * 5. 로그인이 되어 있다면 로그인 처리를 한다.
 * 6. 로그인이 되어 있지 않다면 가입 처리를 한다.
 */
