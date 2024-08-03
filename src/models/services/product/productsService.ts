import { infiniteQueryOptions } from '@tanstack/react-query';
import isServer from '@/utils/isServer';
import axios from '@/lib/axios';

interface InfiniteProductsProps {
  keyword?: string;
  categoryId?: number;
  order?: string;
}

const productsService = {
  queryKey: ['products'],
  queryOptions: (params: InfiniteProductsProps) =>
    infiniteQueryOptions({
      queryKey: [
        'products',
        params.categoryId ?? null,
        params.order ?? null,
        params.keyword ?? null,
      ],
      queryFn: async ({ pageParam = 0 }) => {
        const categoryParam = params.categoryId
          ? `&category=${params.categoryId}`
          : '';
        const keywordParam = params.keyword ? `&keyword=${params.keyword}` : '';
        const cursorParam = pageParam ? `&cursor=${pageParam}` : '';
        const orderParam = params.order ? `order=${params.order}` : '';
        let requestUri;
        if (isServer) {
          requestUri = 'https://mogazoa-api.vercel.app/5-5/products?';
        } else {
          requestUri = 'products?';
        }
        const { data } = await axios.get(
          `${requestUri}${orderParam}${keywordParam}${categoryParam}${cursorParam}`,
        );
        return {
          list: data.list,
          nextCursor: data.nextCursor,
        };
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      staleTime: 5 * 1000,
    }),
};

export default productsService;
