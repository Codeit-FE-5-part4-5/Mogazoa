import axios from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Review } from '@/shared/types/reviews/reviews';

interface UseLikeReviewProps {
  reviewId: number;
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
}

interface ReviewProps {
  pages: Array<{
    list: Review[];
  }>;
}

const useLikeReview = ({ reviewId, productId, order }: UseLikeReviewProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      const reviewDetail = queryClient.getQueryData<ReviewProps>([
        'reviewDetail',
        productId,
        order,
      ]);
      if (!reviewDetail) {
        throw new Error('Review detail not found');
      }
      const review = reviewDetail.pages
        .flatMap((page) => page.list)
        .find((r: Review) => r.id === reviewId);

      if (!review) {
        throw new Error('Review not found');
      }

      const { isLiked } = review;

      return isLiked
        ? axios.post(`/reviews/${reviewId}/like`)
        : axios.delete(`/reviews/${reviewId}/like`);
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

      if (!prevReviewDetail) {
        throw new Error('Review Detail not found');
      }

      queryClient.setQueryData<ReviewProps>(
        ['reviewDetail', productId, order],
        {
          ...prevReviewDetail,
          pages: prevReviewDetail.pages.map((page) => ({
            ...page,
            list: page.list.map((review) => {
              if (review.id === reviewId) {
                return {
                  ...review,
                  isLiked: !review.isLiked,
                };
              }
              return review;
            }),
          })),
        },
      );

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

export default useLikeReview;
