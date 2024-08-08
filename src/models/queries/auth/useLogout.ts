import { removeCookie } from '@/lib/cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      removeCookie('accessToken', { path: '/' });
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['me'] });
      alert('로그아웃 하였습니다.');
      window.location.href = '/';
    },
  });
};

export default useLogout;
