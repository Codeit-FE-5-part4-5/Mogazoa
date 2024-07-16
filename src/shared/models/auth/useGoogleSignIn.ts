import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';

const useGoogleSignIn = () => {
  const { currentQuery, handleRedirect } = useChangeRouter();
  const { code: token } = currentQuery;
  const redirectUri = process.env.NEXT_PUBLIC_DEVELOPMENT_URL;
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

  const googleSignInRequest = () => {
    // return axios.post(`auth/signIn/google`, { redirectUri, token });
    return axios.post(
      `https://oauth2.googleapis.com/token?client_id=${clientId}&client_secret=${clientSecret}&code=${token}&grant_type=authorization_code&redirect_uri=${redirectUri}`,
    );
  };

  return useMutation({
    mutationFn: googleSignInRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
      });
      // handleRedirect('/');
    },
  });
};

export default useGoogleSignIn;
