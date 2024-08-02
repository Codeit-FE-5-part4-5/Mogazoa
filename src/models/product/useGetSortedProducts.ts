import { isServer, queryOptions, useQueries } from '@tanstack/react-query';
import axios from '@/lib/axios';
import sortConverter from '@/utils/sortConverter';
import { ORDER_VARIANTS } from '@/constants/products';

export const sortedProductsService = {
  queryKey: ['sortedProducts'],
  queryOptions: (sortOrder: string) =>
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
    }),
};

const useGetSortedProducts = () => {
  const orderVariants = ORDER_VARIANTS.map((item) => sortConverter(item));

  return useQueries({
    queries: orderVariants.map((sortOrder) =>
      sortedProductsService.queryOptions(sortOrder),
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
