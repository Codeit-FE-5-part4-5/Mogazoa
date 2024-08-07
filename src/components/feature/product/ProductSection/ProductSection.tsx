import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';
import productsService from '@/models/services/product/productsService';
import { ORDER_VARIANTS } from '@/constants/products';
import castArray from '@/utils/castArray';
import { useIntersect } from '@/hooks';
import { withFetchBoundary, DropDown, Carousel } from '@/components/shared';
import ProductCardList from '../ProductCardList/ProductCardList';

interface ProductSectionProps {
  currentCategory?: string;
  onChangeSortOrder: (order: string) => void;
  currentQuery: ParsedUrlQuery;
}

const ProductSection = ({
  currentCategory = '전체 상품',
  onChangeSortOrder,
  currentQuery,
}: ProductSectionProps) => {
  const bestProducts = useSuspenseQuery(
    productsService.queryOptions({
      categoryId: Number(currentQuery.categoryId),
      order: 'rating',
    }),
  );
  const products = useSuspenseInfiniteQuery(
    productsService.infiniteQueryOptions({
      categoryId: Number(currentQuery.categoryId),
      order: castArray(currentQuery.order),
    }),
  );
  const [ref, isIntersect] = useIntersect<HTMLDivElement>(products.isLoading);
  const sliceBestProducts = bestProducts?.data?.slice(0, 6);

  useEffect(() => {
    if (products.hasNextPage && isIntersect) {
      products.fetchNextPage();
    }
  }, [isIntersect, products, products.fetchNextPage, products.hasNextPage]);

  return (
    <div className="mx-[20px] mb-[20px] flex-1 xl:mt-[60px] xl:border-var-black3">
      {sliceBestProducts?.length !== 0 && (
        <Carousel
          currentCategory={currentCategory}
          products={sliceBestProducts}
          key={sliceBestProducts[0]?.id}
          className="mb-[30px]"
        />
      )}
      <div className="mb-[30px]">
        <div className="flex justify-between gap-[20px]">
          <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
            {`${currentCategory}의 모든 상품`}
          </h1>
          <div className="w-[110px] flex-shrink-0">
            <DropDown
              isOrder
              itemList={ORDER_VARIANTS}
              onClick={onChangeSortOrder}
            />
          </div>
        </div>
      </div>
      {products?.data?.pages.map((product, idx) => (
        <ProductCardList
          key={product?.list?.[idx]?.id}
          products={product?.list}
        />
      ))}
      {products.isSuccess && <div ref={ref} />}
    </div>
  );
};

const ProductSectionWithBoundary = withFetchBoundary(
  ProductSection,
  'productsCardWithCarousel',
);

export default ProductSectionWithBoundary;
