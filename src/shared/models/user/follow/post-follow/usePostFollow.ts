import apiInstance from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostFollow = () => {
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
    onError: (error) => {
      console.error(error);
    },
  });
};
