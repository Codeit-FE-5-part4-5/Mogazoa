import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface UseGetProductDetailProps {
  productId: number;
}

const useGetProductDetail = ({ productId }: UseGetProductDetailProps) => {
  return useQuery({
    queryKey: ['productDetail'],
    queryFn: async () => {
      const { data } = await axios.get(`/products/${productId}`);
      return data;
    },
    enabled: !!productId && !Number.isNaN(productId),
  });
};

export default useGetProductDetail;
