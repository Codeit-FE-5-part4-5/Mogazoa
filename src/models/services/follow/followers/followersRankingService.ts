import axios from '@/lib/axios';
import { FollowerRanking } from '@/types/follow/followers/followers-type';
import { queryOptions } from '@tanstack/react-query';

const followersRankingService = {
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

export default followersRankingService;
