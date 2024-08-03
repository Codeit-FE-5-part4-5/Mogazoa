import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { getCookie } from '@/lib/cookie';

const useGetMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const token = getCookie('accessToken');
      if (!token) {
        return null;
      }
      const result = await axios.get(`users/me`);
      return result.data;
    },
  });
};

export default useGetMe;
