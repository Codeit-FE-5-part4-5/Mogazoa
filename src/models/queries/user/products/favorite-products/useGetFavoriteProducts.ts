import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

const useGetFavoriteProducts = (
  userId: number | null | undefined | string | string[],
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['userFavoriteProducts', userId ?? null],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userId)
        return {
          list: {},
          nextCursor: null,
        };

      const cursorParam = pageParam ? `cursor=${pageParam}` : '';

      const { data } = await axios.get(
        `users/${userId}/favorite-products?${cursorParam}`,
      );

      return {
        list: data.list,
        nextCursor: data.nextCursor,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
  });
};

export default useGetFavoriteProducts;
