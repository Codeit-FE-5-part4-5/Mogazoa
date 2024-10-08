import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { Review } from '@/types/reviews/reviews';

interface ReviewProps {
  pages: Array<{
    list: Review[];
  }>;
}
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

      const prevReviewDetail = queryClient.getQueryData<ReviewProps>([
        'reviewDetail',
        productId,
        order,
      ]);

      if (prevReviewDetail && prevReviewDetail.pages) {
        queryClient.setQueryData<ReviewProps>(
          ['reviewDetail', productId, order],
          {
            ...prevReviewDetail,
            pages: prevReviewDetail.pages.map((page) => ({
              ...page,
              list: page.list.filter(
                (review: Review) => review.id !== reviewId,
              ),
            })),
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
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviewDetail', productId, order],
      });
    },
  });
};

export default useDeleteReview;
