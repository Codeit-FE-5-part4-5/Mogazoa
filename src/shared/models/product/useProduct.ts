import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from '@/shared/utils/axios';
import { ItemListResponse, Product } from '@/shared/types/product/product';

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
