import { isServer, queryOptions, useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

export const bestProductsService = {
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

const useGetBestProducts = (categoryId: number) => {
  return useQuery(bestProductsService.queryOptions(categoryId));
};

export default useGetBestProducts;
