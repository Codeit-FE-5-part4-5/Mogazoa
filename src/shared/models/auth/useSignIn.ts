import axios from '@/shared/utils/axios';
import { useMutation } from '@tanstack/react-query';

export default function useSignIn() {
  return useMutation({
    mutationFn: (account: { email: string; password: string }) =>
      axios.post(`auth/signIn`, account),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.data.accessToken);
    },
  });
}
