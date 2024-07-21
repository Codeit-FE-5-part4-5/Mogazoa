import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from '@/shared/utils/axios';
import { ItemListResponse } from '@/shared/types/product/product';

const useGetInfiniteProducts = ({
  keyword,
  categoryId,
  order,
}: {
  keyword?: string;
  categoryId?: number;
  order?: string;
}): UseInfiniteQueryResult<InfiniteData<ItemListResponse>, Error> => {
  return useInfiniteQuery<ItemListResponse, Error>({
    queryKey: ['products', keyword, categoryId, order],
    queryFn: async ({ pageParam = 0 }) => {
      const categoryParam = categoryId ? `&category=${categoryId}` : '';
      const keywordParam = keyword ? `&keyword=${keyword}` : '';
      const cursorParam = pageParam ? `&cursor=${pageParam}` : '';
      const orderParam = order ? `order=${order}` : '';

      const { data } = await axios.get(
        `products?${orderParam}${keywordParam}${categoryParam}${cursorParam}`,
      );

      return {
        list: data.list,
        nextCursor: data.nextCursor,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
};

export default useGetInfiniteProducts;
