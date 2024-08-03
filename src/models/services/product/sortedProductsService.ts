import { queryOptions } from '@tanstack/react-query';
import axios from '@/lib/axios';
import isServer from '@/utils/isServer';

const sortedProductsService = {
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

export default sortedProductsService;
