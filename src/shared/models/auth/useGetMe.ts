import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

const useGetMe = (token: string) => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => axios.get(`users/me`),
    enabled: !!token,
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
  });
};

export default useGetMe;
