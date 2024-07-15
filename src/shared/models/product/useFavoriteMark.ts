import axios from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface UseFavoriteProductProps {
  productId: number;
  accessToken: string;
  initialIsFavorite: boolean;
}

const useFavoriteProduct = ({
  productId,
  accessToken,
  initialIsFavorite,
}: UseFavoriteProductProps) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const queryClient = useQueryClient();

  const toggleFavorite = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        await axios.delete(`/products/${productId}/favorite`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        await axios.post(
          `/products/${productId}/favorite`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productDetail'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    isFavorite,
    setIsFavorite,
    toggleFavorite: toggleFavorite.mutate,
  };
};

export default useFavoriteProduct;
