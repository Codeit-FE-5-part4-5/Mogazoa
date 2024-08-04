import { useSuspenseQueries } from '@tanstack/react-query';
import sortedProductsService from '@/models/services/product/sortedProductsService';

const useGetSortedProducts = () => {
  const orderVariants = ['rating', 'reviewCount'];

  return useSuspenseQueries({
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
