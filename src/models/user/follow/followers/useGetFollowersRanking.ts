import { queryOptions, useQuery } from '@tanstack/react-query';
import { FollowerRanking } from '@/types/follow/followers/followers-type';
import axios from '@/utils/axios';

export const followersRankingService = {
  queryKey: ['users/ranking'],
  queryOptions: () =>
    queryOptions({
      queryKey: ['users/ranking'],
      queryFn: async (): Promise<FollowerRanking[]> => {
        const { data } = await axios.get('users/ranking');
        return data;
      },
      staleTime: 60 * 1000 * 10,
    }),
};

const useGetFollowersRanking = () => {
  return useQuery<FollowerRanking[]>({
    queryKey: ['users/ranking'],
    queryFn: async () => {
      const { data } = await axios.get('users/ranking');
      return data;
    },
    staleTime: 60 * 1000 * 10,
  });
};

export default useGetFollowersRanking;
