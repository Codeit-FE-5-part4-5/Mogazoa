import { useChangeRouter } from '@/hooks';
import { removeCookie } from '@/lib/cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
  const queryClient = useQueryClient();
  const { handleRedirect } = useChangeRouter();

  return useMutation({
    mutationFn: async () => {
      removeCookie('accessToken', { path: '/' });
    },
    onSuccess: () => {
      queryClient.clear();
      alert('로그아웃 하였습니다.');
      // handleRedirect('/');
      window.location.href = '/';
    },
  });
};

export default useLogout;
