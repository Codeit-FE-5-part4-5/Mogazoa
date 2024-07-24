import axios from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Review } from '@/shared/types/reviews/reviews';

interface EditImage {
  id?: number | null;
  source?: string | null;
}

interface EditData {
  images: EditImage[];
  content: string;
  rating: number;
}

interface ReviewProps {
  pages: Array<{
    list: Review[];
  }>;
}

interface UseEditReviewProps {
  reviewId: number | undefined;
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
  updatedReview: Partial<EditData>;
}

const useEditReview = ({
  reviewId,
  productId,
  order,
  updatedReview,
}: UseEditReviewProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.patch(`/reviews/${reviewId}`, updatedReview);
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
              list: page.list.map((review: Review) => {
                if (review.id === reviewId) {
                  return {
                    ...review,
                    ...updatedReview,
                  };
                }
                return review;
              }),
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

export default useEditReview;
