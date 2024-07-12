import { useInfiniteQuery } from '@tanstack/react-query';
import axios from '@/shared/utils/axios';

export default function useGetInfiniteProducts({
  keyword,
  categoryId,
  order = 'recent',
}: {
  keyword?: string;
  categoryId?: number;
  order?: string;
}) {
  return useInfiniteQuery({
    queryKey: ['products', keyword, categoryId, order],
    queryFn: async ({ pageParam = 0 }) => {
      const categoryParam = categoryId ? `&category=${categoryId}` : '';
      const keywordParam = keyword ? `&keyword=${keyword}` : '';
      const cursorParam = pageParam > 0 ? `&cursor=${pageParam}` : '';
      const { data } = await axios.get(
        `products?order=${order}${keywordParam}${categoryParam}${cursorParam}`,
      );

      return {
        list: data.list,
        nextCursor: data.nextCursor,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor !== null ? lastPage.nextCursor : undefined;
    },
  });
}
