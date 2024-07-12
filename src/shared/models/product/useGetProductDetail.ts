import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface UseGetProductDetailProps {
  productId: number;
}

const useGetProductDetail = ({ productId }: UseGetProductDetailProps) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data } = await axios.get(`/products/${productId}`);
      console.log(data);
      return data;
    },
    enabled: !!productId && !isNaN(productId),
  });
};

export default useGetProductDetail;
