import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

const useUserProfile = (userId: number) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => axios.get(`users/${userId}`),
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
  });
};

export default useUserProfile;
