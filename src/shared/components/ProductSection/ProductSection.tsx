import { RefObject } from 'react';
import { ORDER_VARIANTS } from '@/shared/constants/products';
import { ItemListResponse } from '@/shared/types/product/product';
import DropDown from '../DropDown/DropDown';
import ProductCardList from '../ProductCardList/ProductCardList';

interface ProductSectionProps {
  targetRef: RefObject<HTMLDivElement>;
  products?: ItemListResponse[];
  currentCategoryName?: string;
  searchQuery: string;
  changeSortOrder: (order: string) => void;
  isLoading: boolean;
}

const ProductSection = ({
  targetRef,
  products = [],
  currentCategoryName,
  searchQuery,
  changeSortOrder,
  isLoading,
}: ProductSectionProps) => {
  return (
    <div className="mx-[20px] mb-[20px] flex-1 xl:mt-[60px] xl:border-var-black3">
      <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
        <div className="flex justify-between gap-[20px]">
          <p className="mb-[30px]">
            {searchQuery
              ? `${searchQuery}의 검색 결과`
              : `${currentCategoryName}의 모든 상품`}
          </p>
          <div className="w-[110px] flex-shrink-0">
            <DropDown
              isOrder
              itemList={ORDER_VARIANTS}
              onClick={changeSortOrder}
            />
          </div>
        </div>
      </h1>
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
