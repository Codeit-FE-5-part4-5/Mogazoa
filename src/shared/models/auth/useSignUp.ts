import axios from '@/shared/utils/axios';
import { useMutation } from '@tanstack/react-query';

export default function useSignUp() {
  return useMutation({
    mutationFn: (account: {
      email: string;
      nickname: string;
      password: string;
      passwordConfirmation: string;
    }) => axios.post(`auth/signUp`, account),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.data.accessToken);
    },
  });
}
