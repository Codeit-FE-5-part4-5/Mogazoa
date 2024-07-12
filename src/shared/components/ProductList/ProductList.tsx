import { ORDER_VARIANTS } from '@/shared/constants/products';
import DropDown from '../DropDown/DropDown';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '@/shared/types/product/product';

interface ProductListProps {
  products: Product[];
  currentCategoryName?: string;
  searchQuery: string;
  changeSortOrder: (order: string) => void;
}

const ProductList = ({
  products,
  currentCategoryName,
  searchQuery,
  changeSortOrder,
}: ProductListProps) => {
  return (
    <div className="mx-[20px] flex-1 xl:mt-[60px] xl:border-var-black3">
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
      <div className="grid grid-cols-2 gap-[20px] xl:grid-cols-3">
        {products?.length > 0 &&
          products.map((product: Product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              favoriteCount={product.favoriteCount}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
