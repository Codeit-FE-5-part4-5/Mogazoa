import useChangeRouter from '@/shared/hooks/useChangeRouter';
import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';

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
