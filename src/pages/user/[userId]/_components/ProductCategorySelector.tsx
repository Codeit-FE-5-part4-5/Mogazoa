import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="space-y-[30px]">
      <div className="relative xl:hidden">
        <div className="flex w-[130px] cursor-pointer items-center justify-between">
          <div onClick={handleDropdown}>{selectedCategory}</div>
          <ChevronDown
            className={`${isDropdownOpen ? 'rotate-180 transform' : ''}`}
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute z-10 inline-block cursor-pointer rounded-sm border border-var-gray1 bg-[#1c1c22] text-var-gray1">
            <div
              className="p-3 hover:text-var-white"
              onClick={() => {
                setSelectedCategory(ProductCategory.REVIEWED);
                setIsDropdownOpen(false);
              }}
            >
              {ProductCategory.REVIEWED}
            </div>
            <div
              className="p-3 hover:text-var-white"
              onClick={() => {
                setSelectedCategory(ProductCategory.CREATED);
                setIsDropdownOpen(false);
              }}
            >
              {ProductCategory.CREATED}
            </div>
            <div
              className="p-3 hover:text-var-white"
              onClick={() => {
                setSelectedCategory(ProductCategory.FAVORITE);
                setIsDropdownOpen(false);
              }}
            >
              {ProductCategory.FAVORITE}
            </div>
          </div>
        )}
      </div>
      <div className="hidden space-x-10 text-var-gray1 xl:flex">
        <div
          className={`hover:text-var-white ${
            selectedCategory === ProductCategory.REVIEWED
              ? 'text-var-white'
              : ''
          }`}
          onClick={() => setSelectedCategory(ProductCategory.REVIEWED)}
        >
          {ProductCategory.REVIEWED}
        </div>
        <div
          className={`hover:text-var-white ${
            selectedCategory === ProductCategory.CREATED ? 'text-var-white' : ''
          }`}
          onClick={() => setSelectedCategory(ProductCategory.CREATED)}
        >
          {ProductCategory.CREATED}
        </div>
        <div
          className={`hover:text-var-white ${
            selectedCategory === ProductCategory.FAVORITE
              ? 'text-var-white'
              : ''
          }`}
          onClick={() => setSelectedCategory(ProductCategory.FAVORITE)}
        >
          {ProductCategory.FAVORITE}
        </div>
      </div>
    </div>
  );
};

export default ProductCategorySelector;
