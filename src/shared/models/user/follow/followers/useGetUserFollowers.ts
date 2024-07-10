import axios from '@/shared/utils/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useGetUserFollowers = (userId: number) => {
  return useQuery({
    queryKey: ['followers'],
    queryFn: () => axios.get(`users/${userId}/followers`),
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
  });
};

export default useGetUserFollowers;
