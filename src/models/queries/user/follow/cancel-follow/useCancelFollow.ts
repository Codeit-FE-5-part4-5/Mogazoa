import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiInstance from '@/lib/axios';
import { useToast } from '@/components/shared/ui/use-toast';

const useCancelFollow = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }: { userId: number }) => {
      const res = await apiInstance.delete('follow', {
        data: { userId },
      });

      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', data.id] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '팔로우를 취소하는 데 에러가 발생했습니다.',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
    },
  });
};

export default useCancelFollow;
