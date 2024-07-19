import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from '@/shared/utils/axios';

const useGetCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const { data } = await axios.get(`categories`);
      return data;
    },
  });
};

export default useGetCategory;
