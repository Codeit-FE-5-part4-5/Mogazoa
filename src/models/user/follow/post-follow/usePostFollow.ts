import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import apiInstance from '@/utils/axios';

const usePostFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }: { userId: number }) => {
      const res = await apiInstance.post('follow', {
        userId,
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error: unknown) => {
      let errorMessage = '팔로우 시 에러가 발생했습니다.';

      if (error instanceof AxiosError) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = '잘못된 요청입니다.';
              break;
            case 401:
              errorMessage = '로그인이 필요합니다.';
              break;
            case 403:
              errorMessage = '권한이 없습니다.';
              break;
            case 404:
              errorMessage = '사용자를 찾을 수 없습니다.';
              break;
            case 500:
              errorMessage = '서버 에러가 발생했습니다.';
              break;
            default:
              errorMessage = '알 수 없는 에러가 발생했습니다.';
          }
        }
      }

      throw new Error(errorMessage);
    },
  });
};

export default usePostFollow;
