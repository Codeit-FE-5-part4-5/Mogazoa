import { useQuery } from '@tanstack/react-query';
import axios from '@/shared/utils/axios';

export default function useProduct({
  productId,
}: {
  productId: number | null;
}) {
  return useQuery({
    queryKey: [productId],
    queryFn: async () => {
      const { data } = await axios.get(`products/${productId}`);

      return data;
    },
    enabled: !!productId,
  });
}
