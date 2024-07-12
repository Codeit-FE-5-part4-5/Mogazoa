import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

const useGetUserFollowees = (userId: number | undefined) => {
  return useQuery({
    queryKey: ['followees', userId],
    queryFn: () => axios.get(`users/${userId}/followees`),
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
    enabled: userId !== undefined,
  });
};

export default useGetUserFollowees;
