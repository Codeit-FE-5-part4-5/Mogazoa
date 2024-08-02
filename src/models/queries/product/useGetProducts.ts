import { useQuery } from '@tanstack/react-query';
import bestProductsService from '@/models/services/product/bestProductsService';

const useGetBestProducts = (categoryId: number) => {
  return useQuery(bestProductsService.queryOptions(categoryId));
};

export default useGetBestProducts;
