import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { getCookie } from '@/lib/cookie';

const useGetMe = () => {
  const token = getCookie('accessToken');
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const result = await axios.get(`users/me`);
      return result.data;
    },
    enabled: !!token,
  });
};

export default useGetMe;
