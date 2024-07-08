import { useQuery } from '@tanstack/react-query';
import axios from '@/shared/utils/axios';

export default function useGetCategory() {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const { data } = await axios.get(`categories`);
      return data;
    },
  });
}
