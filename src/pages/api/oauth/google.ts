import validateArray from '@/shared/utils/validateArray';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const signupRequest = async (params: { code: string; nickname: string }) => {
  const result = await axios.post(
    `https://mogazoa-api.vercel.app/5-5/auth/signUp/google`,
    {
      token: params.code,
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
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
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
    },
  );
  return result;
};

const getIdToken = async (code: string) => {
  const result = await axios.post(
    `https://oauth2.googleapis.com/token?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`,
  );
  return result;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;

  let idTokenRes;
  let response;
  try {
    idTokenRes = await getIdToken(validateArray(code));
    if (!idTokenRes) return;

    const { id_token: idToken } = idTokenRes.data;
    if (!state) {
      response = await signinRequest(idToken);
    } else {
      response = await signupRequest({
        nickname: validateArray(state),
        code: validateArray(code),
      });
    }

    if (response?.status === 200) {
      res.setHeader(
        'Set-Cookie',
        `accessToken=${response.data.accessToken}; Path=/;`,
      );
      res.redirect('/');
    } else {
      const errorCode = encodeURIComponent(response?.status);
      const errorMessage = encodeURIComponent(response?.data?.message);
      res.redirect(
        `${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_URI!}?errorCode=${errorCode}&errorMessage=${errorMessage}`,
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 403) {
        res.redirect(process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_URI!);
      } else {
        const errorCode = encodeURIComponent(error?.response?.status || '500');
        const errorMessage = encodeURIComponent(
          error?.response?.data?.message || 'Not Found',
        );
        res.redirect(
          `${process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_URI!}?errorCode=${errorCode}&errorMessage=${errorMessage}`,
        );
      }
    }
  }
};

export default handler;
