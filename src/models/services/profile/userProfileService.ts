import axios from '@/lib/axios';
import { queryOptions } from '@tanstack/react-query';

const userProfileService = {
  queryKey: ['userProfile'],
  queryOptions: (userId: number) =>
    queryOptions({
      queryKey: ['userProfile', userId ?? null],
      queryFn: async () => {
        if (!userId) {
          return null;
        }

        const { data } = await axios.get(`users/${userId}`);
        return data;
      },
      enabled: !!userId && !Number.isNaN(userId),
    }),
};

export default userProfileService;
