import {
  infiniteQueryOptions,
  isServer,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from '@/shared/utils/axios';

interface InfiniteProductsProps {
  keyword?: string;
  categoryId?: number;
  order?: string;
}

export const infiniteProductsOption = (params: InfiniteProductsProps) =>
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
  });

const useGetInfiniteProducts = (params: InfiniteProductsProps) => {
  return useInfiniteQuery(infiniteProductsOption(params));
};

export default useGetInfiniteProducts;

// const useGetInfiniteProducts = ({
//   keyword,
//   categoryId,
//   order,
// }: {
//   keyword?: string;
//   categoryId?: number;
//   order?: string;
// }): UseInfiniteQueryResult<InfiniteData<ItemListResponse>, Error> => {
//   return useInfiniteQuery<ItemListResponse, Error>(
//     productsOptions({ keyword, categoryId, order }),
//   );
// };

// export default useGetInfiniteProducts;
