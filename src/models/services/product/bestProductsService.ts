import { queryOptions } from '@tanstack/react-query';
import axios from '@/lib/axios';

const bestProductsService = {
  queryKey: ['bestProduct'],
  queryOptions: (categoryId: number) =>
    queryOptions({
      queryKey: ['bestProduct', categoryId],
      queryFn: async () => {
        const categoryParam = categoryId ? `&category=${categoryId}` : '';
        const { data } = await axios.get(
          `products?order=rating${categoryParam}`,
        );
        return data.list;
      },
      staleTime: 60 * 1000 * 10,
    }),
};

export default bestProductsService;
