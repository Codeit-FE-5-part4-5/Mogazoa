import axios from '@/shared/utils/axios';
import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function useSignIn() {
  const router = useRouter();

  return useMutation({
    mutationFn: (account: { email: string; password: string }) =>
      axios.post(`auth/signIn`, account),
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
      });
      router.push('/');
    },
  });
}
