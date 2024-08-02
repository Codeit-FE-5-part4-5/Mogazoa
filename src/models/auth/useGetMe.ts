import { isServer, queryOptions, useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { getCookie } from '@/utils/cookie';

export const meService = {
  queryKey: ['me'],
  queryOptions: (token: string) =>
    queryOptions({
      queryKey: ['me'],
      queryFn: async () => {
        let result;
        if (isServer) {
          result = await axios.get(
            `https://mogazoa-api.vercel.app/5-5/users/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } else {
          result = await axios.get(`users/me`);
        }

        return result.data;
      },
      enabled: !!token,
    }),
};

const useGetMe = () => {
  const token = getCookie('accessToken');

  return useQuery(meService.queryOptions(token));
};

export default useGetMe;
