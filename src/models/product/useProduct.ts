import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { Product } from '@/types/product/product';

export default function useProduct({
  productId,
}: {
  productId: number | null;
}) {
  return useQuery<Product>({
    queryKey: [productId],
    queryFn: async () => {
      const { data } = await axios.get(`products/${productId}`);
      return data;
    },
    enabled: !!productId,
  });
}
