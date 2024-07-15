import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface UseGetProductDetailReviewsProps {
  productId: number;
}

const useGetProductDetailReviews = ({
  productId,
}: UseGetProductDetailReviewsProps) => {
  return useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: async () => {
      const { data } = await axios.get(`/products/${productId}/reviews`);
      return data;
    },
    enabled: !!productId && !isNaN(productId),
  });
};

export default useGetProductDetailReviews;
