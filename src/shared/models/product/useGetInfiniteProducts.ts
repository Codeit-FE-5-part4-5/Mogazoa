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
    queryKey: ['products'],
    queryFn: async ({ pageParam = 0 }) => {
      const categoryParam = categoryId ? `&category=${categoryId}` : '';
      const keywordParam = keyword ? `&keyword=${keyword}` : '';
      const cursorParam = pageParam > 0 ? `&cursor=${pageParam}` : '';
      const { data } = await axios.get(
        `products?order=${order}${cursorParam}${keywordParam}${categoryParam}`,
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
