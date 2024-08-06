import { useQuery } from '@tanstack/react-query';
import { getCookie } from '@/lib/cookie';
import meService from '@/models/services/auth/meService';

const useGetMe = () => {
  const token = getCookie('accessToken');
  return useQuery(meService.queryOptions(token));
};

export default useGetMe;
