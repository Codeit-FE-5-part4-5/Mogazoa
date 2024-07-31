import { ORDER_VARIANTS } from '@/shared/constants/products';
import { SortedItemListResponse } from '@/shared/types/product/product';
import axios from '@/shared/utils/axios';
import sortConverter from '@/shared/utils/sortConverter';
import { isServer, queryOptions, useQueries } from '@tanstack/react-query';

export const sortedProductsQueryOption = (sortOrder: string) =>
  queryOptions({
    queryKey: ['sortedProduct', sortOrder],
    queryFn: async () => {
      const requestUri = isServer
        ? 'https://mogazoa-api.vercel.app/5-5/products?'
        : 'products?';
      const { data } = await axios.get(`${requestUri}order=${sortOrder}`);
      return {
        list: data.list,
        nextCursor: data.nextCursor,
        sortBy: sortOrder,
      };
    },
    staleTime: 60 * 1000 * 10,
  });

const useGetSortedProducts = (): SortedItemListResponse => {
  const orderVariants = ORDER_VARIANTS.map((item) => sortConverter(item));

  return useQueries({
    queries: orderVariants.map((sortOrder) =>
      sortedProductsQueryOption(sortOrder),
    ),
    combine: (results) => {
      return {
        data: results.map((result, idx) => {
          return {
            list: result?.data?.list,
            nextCursor: result?.data?.nextCursor,
            sortBy: orderVariants[idx],
          };
        }),
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });
};

export default useGetSortedProducts;
