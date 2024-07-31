import axios from '@/shared/utils/axios';
import { getCookie } from '@/shared/utils/cookie';
import { isServer, queryOptions, useQuery } from '@tanstack/react-query';

export const meQueryOption = (token: string) =>
  queryOptions({
    queryKey: ['me'],
    queryFn: async () => {
      const requestUri = isServer
        ? 'https://mogazoa-api.vercel.app/5-5/users/me'
        : 'users/me';
      const { data } = await axios.get(requestUri);
      return data;
    },
    enabled: !!token,
  });

const useGetMe = () => {
  const token = getCookie('accessToken');

  return useQuery(meQueryOption(token));
};

export default useGetMe;
