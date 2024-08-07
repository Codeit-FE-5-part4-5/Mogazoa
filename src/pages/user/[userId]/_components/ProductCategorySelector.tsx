import { useState } from 'react';
import { DropDown } from '@/components/shared';
import { ProductCategory } from '..';

interface ProductCategorySelectorProps {
  selectedCategory: ProductCategory;
  setSelectedCategory: (category: ProductCategory) => void;
}

const ProductCategorySelector = ({
  selectedCategory,
  setSelectedCategory,
}: ProductCategorySelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const orderList = ['리뷰한 상품', '등록한 상품', '찜한 상품'];

  const handleListClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mb-[30px] mt-[52px]">
      <div className="relative xl:hidden">
        <div className="w-[150px]">
          <DropDown isOrder itemList={orderList} onClick={handleListClick} />
        </div>
      </div>
      <div className="hidden space-x-10 font-semibold text-var-gray1 xl:flex">
        <button
          type="button"
          className={`transition-all duration-300 hover:text-var-white ${
            selectedCategory === ProductCategory.REVIEWED
              ? 'text-[18px] text-var-white'
              : ''
          }`}
          onClick={() => setSelectedCategory(ProductCategory.REVIEWED)}
        >
          {ProductCategory.REVIEWED}
        </button>
        <button
          type="button"
          className={`transition-all duration-300 hover:text-var-white ${
            selectedCategory === ProductCategory.CREATED
              ? 'text-[18px] text-var-white'
              : ''
          }`}
          onClick={() => setSelectedCategory(ProductCategory.CREATED)}
        >
          {ProductCategory.CREATED}
        </button>
        <button
          type="button"
          className={`transition-all duration-300 hover:text-var-white ${
            selectedCategory === ProductCategory.FAVORITE
              ? 'text-[18px] text-var-white'
              : ''
          }`}
          onClick={() => setSelectedCategory(ProductCategory.FAVORITE)}
        >
          {ProductCategory.FAVORITE}
        </button>
      </div>
    </div>
  );
};

export default ProductCategorySelector;
