import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

const useUserProfile = (userId: number | null | undefined) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const { data } = await axios.get(`users/${userId}`);
      return data;
    },
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
    enabled: !!userId && !Number.isNaN(userId),
  });
};

export default useUserProfile;
