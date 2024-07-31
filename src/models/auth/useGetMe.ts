import axios from '@/shared/utils/axios';
import { getCookie } from '@/shared/utils/cookie';
import { useQuery } from '@tanstack/react-query';

const useGetMe = () => {
  const token = getCookie('accessToken');

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await axios.get(`users/me`);
      return response.data;
    },
    enabled: !!token,
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
  });
};

export default useGetMe;
