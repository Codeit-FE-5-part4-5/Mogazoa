import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { setCookie } from '@/lib/cookie';
import useChangeRouter from '@/hooks/useChangeRouter';

const signUpRequest = (params: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}) => {
  return axios.post(`auth/signUp`, params);
};

const useSignUp = () => {
  const { handleRedirect } = useChangeRouter();

  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });
      handleRedirect('/');
    },
  });
};

export default useSignUp;
