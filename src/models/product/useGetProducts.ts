import { useQuery } from '@tanstack/react-query';
import axios from '@/shared/utils/axios';

const getProductsRequest = async ({
  keyword,
  categoryId,
  order,
}: {
  keyword?: string;
  categoryId?: number;
  order?: string;
}) => {
  const categoryParam = categoryId ? `&category=${categoryId}` : '';
  const keywordParam = keyword ? `&keyword=${keyword}` : '';
  const { data } = await axios.get(
    `products?order=${order}${keywordParam}${categoryParam}`,
  );
  return data.list;
};

const useGetProducts = ({
  keyword,
  categoryId,
  order = 'recent',
}: {
  keyword?: string;
  categoryId?: number;
  order?: string;
}) => {
  return useQuery({
    queryKey: ['sortedProducts', keyword, categoryId, order],
    queryFn: () => getProductsRequest({ keyword, categoryId, order }),
  });
};

export default useGetProducts;
