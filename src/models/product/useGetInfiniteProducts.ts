import {
  InfiniteData,
  infiniteQueryOptions,
  isServer,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import axios from '@/shared/utils/axios';
import { ItemListResponse } from '@/shared/types/product/product';

interface InfiniteProductsProps {
  keyword?: string;
  categoryId?: number;
  order?: string;
}

type TGetProducts = (
  params: InfiniteProductsProps,
) => UseInfiniteQueryResult<InfiniteData<ItemListResponse>, Error>;

export const productsService = {
  queryKey: ['products'],
  queryOptions: (params: InfiniteProductsProps) =>
    infiniteQueryOptions({
      queryKey: ['products', params.categoryId, params.order, params.keyword],
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
    }),
};

const useGetInfiniteProducts: TGetProducts = (params) => {
  return useInfiniteQuery(productsService.queryOptions(params));
};

export default useGetInfiniteProducts;
