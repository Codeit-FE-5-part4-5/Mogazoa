import { useQueries } from '@tanstack/react-query';
import sortConverter from '@/utils/sortConverter';
import { ORDER_VARIANTS } from '@/constants/products';
import sortedProductsService from '@/models/services/product/sortedProductsService';

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
