import { ProductDetail } from '@/shared/types/product/productDetail';
import axios from '@/shared/utils/axios';
import { queryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetProductDetailProps {
  productId: number;
}

type TGetProductDetail = (
  params: UseGetProductDetailProps,
) => UseQueryResult<ProductDetail, Error>;

export const getProductDetailOption = ({
  productId,
}: UseGetProductDetailProps) =>
  queryOptions({
    queryKey: ['productDetail'],
    queryFn: async () => {
      const { data } = await axios.get(`/products/${productId}`);
      return data;
    },
    enabled: !!productId && !Number.isNaN(productId),
  });

const useGetProductDetail: TGetProductDetail = ({ productId }) => {
  return useQuery(getProductDetailOption({ productId }));
};

export default useGetProductDetail;
