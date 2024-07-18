import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface UseGetProductDetailReviewsProps {
  productId: number | undefined;
  order?: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
}

const useGetProductDetailReviews = ({
  productId,
  order = 'recent',
}: UseGetProductDetailReviewsProps) => {
  return useQuery({
    queryKey: ['reviewDetail', productId, order],
    queryFn: async () => {
      const { data } = await axios.get(`/products/${productId}/reviews`, {
        params: { order },
      });
      return data;
    },
    enabled: !!productId && !isNaN(productId),
  });
};

export default useGetProductDetailReviews;
