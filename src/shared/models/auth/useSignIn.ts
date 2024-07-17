import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';

export const signInRequest = (account: { email: string; password: string }) => {
  return axios.post(`auth/signIn`, account);
};

export default function useSignIn() {
  const { handleRedirect } = useChangeRouter();

  return useMutation({
    mutationFn: signInRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
      });
      handleRedirect('/');
    },
  });
}
