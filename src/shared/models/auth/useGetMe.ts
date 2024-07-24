import { Me } from '@/shared/types/user/user';
import axios from '@/shared/utils/axios';
import { getCookie } from '@/shared/utils/cookie';
import { useQuery } from '@tanstack/react-query';

const useGetMe = () => {
  const token = getCookie('accessToken');

  return useQuery<Me>({
    queryKey: ['me'],
    queryFn: () => axios.get(`users/me`),
    enabled: !!token,
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
  });
};

export default useGetMe;
