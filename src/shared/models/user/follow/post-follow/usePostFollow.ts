import { useToast } from '@/components/ui/use-toast';
import apiInstance from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostFollow = () => {
  const { toast } = useToast();
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
    onError: () => {
      toast({
        variant: 'destructive',
        title: '팔로우 시 에러가 발생했습니다.',
      });
    },
  });
};

export default usePostFollow;
