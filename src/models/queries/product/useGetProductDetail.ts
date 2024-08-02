import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { ProductDetail } from '@/types/product/productDetail';

interface UseGetProductDetailProps {
  productId: number;
}

type TGetProductDetail = (
  params: UseGetProductDetailProps,
) => UseQueryResult<ProductDetail, Error>;

const useGetProductDetail: TGetProductDetail = ({ productId }) => {
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
