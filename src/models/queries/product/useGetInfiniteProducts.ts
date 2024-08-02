import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { ItemListResponse } from '@/types/product/product';
import productsService from '@/models/services/product/productsService';

interface InfiniteProductsProps {
  keyword?: string;
  categoryId?: number;
  order?: string;
}

type TGetProducts = (
  params: InfiniteProductsProps,
) => UseInfiniteQueryResult<InfiniteData<ItemListResponse>, Error>;

const useGetInfiniteProducts: TGetProducts = (params) => {
  return useInfiniteQuery(productsService.queryOptions(params));
};

export default useGetInfiniteProducts;
