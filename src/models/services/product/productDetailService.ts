import axios from '@/lib/axios';
import isServer from '@/utils/isServer';
import { queryOptions } from '@tanstack/react-query';

const productDetailService = {
  queryKey: ['productDetail'],
  queryOptions: (productId: number) =>
    queryOptions({
      queryKey: ['productDetail', productId ?? null],
      queryFn: async () => {
        if (!productId) {
          return {};
        }

        const requestUri = isServer
          ? 'https://mogazoa-api.vercel.app/5-5/products/'
          : 'products';

        const { data } = await axios.get(`${requestUri}/${productId}`);
        return data;
      },
      enabled: !!productId,
      staleTime: 10 * 1000,
    }),
};

export default productDetailService;
