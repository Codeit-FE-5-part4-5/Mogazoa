import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

const useGetReviewedProducts = (userId: number | null | undefined) => {
  return useQuery({
    queryKey: ['userProducts', userId],
    queryFn: () => axios.get(`users/${userId}/reviewed-products`),
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
    enabled: !!userId && !isNaN(userId),
  });
};

export default useGetReviewedProducts;
