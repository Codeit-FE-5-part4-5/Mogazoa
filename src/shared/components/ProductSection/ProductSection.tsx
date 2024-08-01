import { RefObject } from 'react';
import { ORDER_VARIANTS } from '@/shared/constants/products';
import { ItemListResponse, Product } from '@/shared/types/product/product';
import DropDown from '../DropDown/DropDown';
import ProductCardList from '../ProductCardList/ProductCardList';
import Carousel from '../Carousel/Carousel';

interface ProductSectionProps {
  targetRef: RefObject<HTMLDivElement>;
  products?: ItemListResponse[];
  bestProducts: Product[];
  currentCategoryName?: string;
  searchQuery: string;
  changeSortOrder: (order: string) => void;
  isLoading: boolean;
}

const ProductSection = ({
  targetRef,
  products = [],
  bestProducts = [],
  currentCategoryName,
  searchQuery,
  changeSortOrder,
  isLoading,
}: ProductSectionProps) => {
  return (
    <div className="mx-[20px] mb-[20px] flex-1 xl:mt-[60px] xl:border-var-black3">
      {bestProducts?.length !== 0 && (
        <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
          {`${currentCategoryName}의`}&nbsp;
          <span className="bg-gradient-custom bg-clip-text text-transparent">
            TOP 6
          </span>
        </h1>
      )}
      <Carousel
        products={bestProducts}
        key={bestProducts[0]?.id}
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
      {products.map((product) => (
        <ProductCardList
          key={product.nextCursor}
          products={product?.list}
          isLoading={isLoading}
        />
      ))}
      <div ref={targetRef} />
    </div>
  );
};

export default ProductSection;
