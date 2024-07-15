import apiInstance from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }: { userId: number }) => {
      const res = await apiInstance.delete('follow', {
        data: { userId },
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
