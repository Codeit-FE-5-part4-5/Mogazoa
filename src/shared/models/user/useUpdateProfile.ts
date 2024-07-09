import apiInstance from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      nickname,
      description,
      image,
    }: {
      nickname: string;
      description: string;
      image: string;
    }) => {
      const res = await apiInstance.patch('users/me', {
        nickname,
        description,
        image,
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
