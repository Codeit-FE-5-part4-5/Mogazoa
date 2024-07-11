import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

const useGetUserFollowers = (userId: number | undefined) => {
  return useQuery({
    queryKey: ['followers', userId],
    queryFn: () => axios.get(`users/${userId}/followers`),
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
    enabled: userId !== undefined,
  });
};

export default useGetUserFollowers;
