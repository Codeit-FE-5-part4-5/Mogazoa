import axios from '@/shared/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductDetail } from '@/shared/types/product/productDetail';

interface UseFavoriteProductProps {
  productId: number;
}

const useFavoriteProduct = ({ productId }: UseFavoriteProductProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      const productDetail = queryClient.getQueryData<ProductDetail>([
        'productDetail',
      ]);
      if (!productDetail) {
        throw new Error('Product detail not found');
      }

      const { isFavorite } = productDetail;
      return isFavorite
        ? axios.post(`/products/${productId}/favorite`)
        : axios.delete(`/products/${productId}/favorite`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['productDetail'] });
      const prevProductDetail = queryClient.getQueryData<ProductDetail>([
        'productDetail',
      ]);
      if (!prevProductDetail) {
        throw new Error('Product detail not found');
      }

      queryClient.setQueryData<ProductDetail>(['productDetail'], (oldData) => ({
        ...(oldData as ProductDetail),
        isFavorite: !(oldData as ProductDetail).isFavorite,
      }));
      return { prevProductDetail };
    },
    onError: (error, variables, context) => {
      if (context?.prevProductDetail) {
        queryClient.setQueryData(['productDetail'], context.prevProductDetail);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['productDetail'] });
    },
  });
};

export default useFavoriteProduct;
