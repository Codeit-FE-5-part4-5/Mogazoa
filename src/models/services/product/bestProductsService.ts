import { queryOptions } from '@tanstack/react-query';
import axios from '@/lib/axios';
import isServer from '@/utils/isServer';

const bestProductsService = {
  queryKey: ['bestProduct'],
  queryOptions: (categoryId: number) =>
    queryOptions({
      queryKey: ['bestProduct', categoryId],
      queryFn: async () => {
        const requestUri = isServer
          ? 'https://mogazoa-api.vercel.app/5-5/products?'
          : 'products?';
        const categoryParam = categoryId ? `&category=${categoryId}` : '';
        const { data } = await axios.get(
          `${requestUri}order=rating${categoryParam}`,
        );
        return data.list;
      },
      staleTime: 60 * 1000 * 10,
    }),
};

export default bestProductsService;
