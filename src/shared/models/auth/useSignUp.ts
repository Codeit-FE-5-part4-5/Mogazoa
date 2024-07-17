import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';

export default function useSignUp() {
  const { handleRedirect } = useChangeRouter();

  return useMutation({
    mutationFn: (account: {
      email: string;
      nickname: string;
      password: string;
      passwordConfirmation: string;
    }) => axios.post(`auth/signUp`, account),
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
      });
      handleRedirect('/');
    },
  });
}
