import { ORDER_VARIANTS } from '@/shared/constants/products';
import axios from '@/shared/utils/axios';
import sortConverter from '@/shared/utils/sortConverter';
import { useQueries } from '@tanstack/react-query';

const getSortedProductsRequest = async (sortOrder: string) => {
  const result = await axios.get(`products?order=${sortOrder}`);

  return result;
};

const useGetSortedProducts = () => {
  const orderVariants = ORDER_VARIANTS.map((item) => sortConverter(item));

  return useQueries({
    queries: orderVariants.map((sortOrder) => ({
      queryKey: ['sortedProduct', sortOrder],
      queryFn: () => getSortedProductsRequest(sortOrder),
    })),
    combine: (results) => {
      return {
        data: results.map((result, idx) => {
          return {
            ...result.data?.data,
            sortBy: orderVariants[idx],
          };
        }),
        isPending: results.some((result) => result.isPending),
      };
    },
  });
};

export default useGetSortedProducts;
