import { useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';
import useGetInfiniteProducts from '@/models/product/useGetInfiniteProducts';
import useGetBestProducts from '@/models/product/useGetProducts';
import { ORDER_VARIANTS } from '@/constants/products';
import castArray from '@/utils/castArray';
import { useIntersect } from '@/hooks';
import { DropDown, Carousel } from '@/components/shared';
import ProductCardList from '../ProductCardList/ProductCardList';

interface ProductSectionProps {
  currentCategoryName?: string;
  changeSortOrder: (order: string) => void;
  searchQuery: string;
  currentQuery: ParsedUrlQuery;
}

const ProductSection = ({
  currentCategoryName,
  changeSortOrder,
  searchQuery,
  currentQuery,
}: ProductSectionProps) => {
  const bestProducts = useGetBestProducts(Number(currentQuery.categoryId));
  const products = useGetInfiniteProducts({
    categoryId: Number(currentQuery.categoryId),
    order: castArray(currentQuery.order),
    keyword: searchQuery,
  });
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
        <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
          {`${currentCategoryName}의`}&nbsp;
          <span className="bg-gradient-custom bg-clip-text text-transparent">
            TOP 6
          </span>
        </h1>
      )}
      <Carousel
        products={sliceBestProducts}
        key={sliceBestProducts[0]?.id}
        className="mb-[30px]"
      />
      <div className="mb-[30px]">
        <div className="flex justify-between gap-[20px]">
          <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
            {searchQuery
              ? `${searchQuery}의 검색 결과`
              : `${currentCategoryName}의 모든 상품`}
          </h1>
          <div className="w-[110px] flex-shrink-0">
            <DropDown
              isOrder
              itemList={ORDER_VARIANTS}
              onClick={changeSortOrder}
            />
          </div>
        </div>
      </div>
      {products.data?.pages.map((product) => (
        <ProductCardList
          key={product.nextCursor}
          products={product?.list}
          isLoading={products.isLoading}
        />
      ))}
      {products.isSuccess && <div ref={ref} />}
    </div>
  );
};

export default ProductSection;
