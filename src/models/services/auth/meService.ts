import axios from '@/lib/axios';
import isServer from '@/utils/isServer';
import { queryOptions } from '@tanstack/react-query';

const meService = {
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

export default meService;
