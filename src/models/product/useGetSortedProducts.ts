import { ORDER_VARIANTS } from '@/shared/constants/products';
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
  });

const useGetSortedProducts = () => {
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
        isPending: results.some((result) => result.isPending),
      };
    },
  });
};

export default useGetSortedProducts;
