import { ORDER_VARIANTS } from '@/shared/constants/products';
import { Product } from '@/shared/types/product/product';
import DropDown from '../DropDown/DropDown';
import ProductCardList from '../ProductCardList/ProductCardList';

interface ProductSectionProps {
  products?: Product[];
  currentCategoryName?: string;
  searchQuery: string;
  changeSortOrder: (order: string) => void;
  isLoading: boolean;
}

const ProductSection = ({
  products,
  currentCategoryName,
  searchQuery,
  changeSortOrder,
  isLoading,
}: ProductSectionProps) => {
  return (
    <div className="mx-[20px] mb-[20px] flex-1 xl:mt-[60px] xl:border-var-black3">
      <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
        <div className="flex justify-between">
          <p className="mb-[30px]">
            {searchQuery
              ? `${searchQuery}의 검색 결과`
              : `${currentCategoryName}의 모든 상품`}
          </p>
          <div className="w-[110px]">
            <DropDown
              isOrder
              itemList={ORDER_VARIANTS}
              onClick={changeSortOrder}
            />
          </div>
        </div>
      </h1>
      {products && (
        <ProductCardList products={products} isLoading={isLoading} />
      )}
    </div>
  );
};

export default ProductSection;
