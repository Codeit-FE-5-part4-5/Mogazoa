import { Product } from '@/shared/types/product/product';
import useGetSortedProducts from '@/models/product/useGetSortedProducts';
import sortConverter from '@/shared/utils/sortConverter';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../Spinner/Spinner';

const SortedProductList = () => {
  const { data: sortedProducts, isPending } = useGetSortedProducts();
  if (isPending) {
    return <Spinner isLoading />;
  }

  return sortedProducts.map((products) => (
    <div
      key={products.sortBy}
      className="mx-[20px] mb-[60px] flex-1 xl:mt-[60px] xl:border-var-black3"
    >
      <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
        <p>
          {sortConverter(products.sortBy)}&nbsp;
          <span className="bg-gradient-custom bg-clip-text text-transparent">
            TOP 6
          </span>
        </p>
      </h1>
      <div className="grid grid-cols-2 gap-[20px] xl:grid-cols-3">
        {products.list?.map((product: Product, idx: number) => {
          if (idx > 5) return null;
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              favoriteCount={product.favoriteCount}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          );
        })}
      </div>
    </div>
  ));
};

export default SortedProductList;
