import axios from '@/shared/utils/axios';
import { getCookie } from '@/shared/utils/cookie';
import { isServer, queryOptions, useQuery } from '@tanstack/react-query';

export const meQueryOption = (token: string) =>
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
  });

const useGetMe = () => {
  const token = getCookie('accessToken');

  return useQuery(meQueryOption(token));
};

export default useGetMe;
