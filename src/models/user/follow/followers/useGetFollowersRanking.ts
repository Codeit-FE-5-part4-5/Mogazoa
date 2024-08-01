import { FollowerRanking } from '@/shared/types/follow/followers/followers-type';
import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

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
