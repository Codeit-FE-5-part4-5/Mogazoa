import { queryOptions } from '@tanstack/react-query';
import axios from '@/lib/axios';
import isServer from '@/utils/isServer';

const meService = {
  queryKey: ['me'],
  queryOptions: (token: string) =>
    queryOptions({
      queryKey: ['me'],
      queryFn: async () => {
        if (!token) {
          return {};
        }

        const requestUri = isServer
          ? 'https://mogazoa-api.vercel.app/5-5/users/me'
          : 'users/me';
        const { data } = await axios.get(requestUri, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      },
      enabled: !!token,
    }),
};

export default meService;
