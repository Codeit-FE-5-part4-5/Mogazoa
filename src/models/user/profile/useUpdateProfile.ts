import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiInstance from '@/utils/axios';
import { useToast } from '@/components/ui/use-toast';

const useUpdateProfile = () => {
  const { toast } = useToast();
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
    onError: () => {
      toast({
        variant: 'destructive',
        title: '프로필을 업데이트하는 데 에러가 발생했습니다.',
      });
    },
  });
};

export default useUpdateProfile;
