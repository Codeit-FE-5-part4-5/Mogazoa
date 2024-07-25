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

const getIdToken = async (code: string) => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    code,
  });
  const result = await axios.post(
    `https://oauth2.googleapis.com/token?${params.toString()}`,
  );
  return result;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;

  let idTokenResponse;
  let idToken;
  let response;
  try {
    if (code) {
      idTokenResponse = await getIdToken(validateArray(code));
      if (idTokenResponse?.status === 200) {
        idToken = idTokenResponse.data.id_token;
      }
    }

    if (!state) {
      response = await signinRequest(idToken);
    } else {
      response = await signupRequest({
        nickname: validateArray(state),
        code: validateArray(code),
      });
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
        res.redirect(process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_URI!);
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
