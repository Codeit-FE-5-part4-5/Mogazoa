import axios from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewDetail, Review } from '@/shared/types/reviews/reviews';

interface UseLikeReviewProps {
  reviewId: number;
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
}

const useLikeReview = ({ reviewId, productId, order }: UseLikeReviewProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      const reviewDetail = queryClient.getQueryData<ReviewDetail>([
        'reviewDetail',
        productId,
        order,
      ]);
      if (!reviewDetail) {
        throw new Error('Review detail not found');
      }

      const review = reviewDetail.list.find((r: Review) => r.id === reviewId);
      if (!review) {
        throw new Error('Review not found');
      }

      const { isLiked } = review;
      return isLiked
        ? axios.delete(`/reviews/${reviewId}/like`)
        : axios.post(`/reviews/${reviewId}/like`);
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
      if (!prevReviewDetail) {
        throw new Error('Review Detail not found');
      }

      queryClient.setQueryData<ReviewDetail>(
        ['reviewDetail', productId, order],
        (oldData) => ({
          ...(oldData as ReviewDetail),
          isLiked: !(oldData as ReviewDetail).list.isLiked,
        }),
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
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviewDetail', productId, order],
      });
    },
  });
};

export default useLikeReview;
