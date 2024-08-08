import { useQuery } from '@tanstack/react-query';
import { FollowerRanking } from '@/types/follow/followers/followers-type';
import axios from '@/lib/axios';

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
