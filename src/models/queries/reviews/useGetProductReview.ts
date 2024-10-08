import { useInfiniteQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { ReviewDetail } from '@/types/reviews/reviews';

interface UseGetProductDetailReviewsProps {
  productId: number | undefined;
  order?: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
}

const useGetProductDetailReviews = ({
  productId,
  order,
}: UseGetProductDetailReviewsProps) => {
  return useInfiniteQuery<ReviewDetail, Error>({
    queryKey: ['reviewDetail', productId, order],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await axios.get(`/products/${productId}/reviews`, {
        params: { order, cursor: pageParam },
      });
      return data;
    },
    enabled: !!productId && !Number.isNaN(productId),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
};

export default useGetProductDetailReviews;
