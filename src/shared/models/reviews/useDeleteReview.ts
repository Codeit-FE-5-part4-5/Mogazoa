import axios from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewDetail, Review } from '@/shared/types/reviews/reviews';

interface UseDeleteReviewProps {
  reviewId: number | undefined;
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
}

const useDeleteReview = ({
  reviewId,
  productId,
  order,
}: UseDeleteReviewProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.delete(`/reviews/${reviewId}`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['reviewDetail', productId, order],
      });

      const prevReviewDetail = queryClient.getQueryData<ReviewDetail>([
        'reviewDetail',
        productId,
        order,
      ]);

      if (prevReviewDetail) {
        queryClient.setQueryData<ReviewDetail>(
          ['reviewDetail', productId, order],
          {
            ...prevReviewDetail,
            list: prevReviewDetail.list.filter(
              (review: Review) => review.id !== reviewId,
            ),
          },
        );
      }

      return { prevReviewDetail };
    },
    onError: (error, variables, context) => {
      if (context?.prevReviewDetail) {
        queryClient.setQueryData(
          ['reviewDetail', productId, order],
          context.prevReviewDetail,
        );
      }
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviewDetail', productId, order],
      });
    },
  });
};

export default useDeleteReview;
