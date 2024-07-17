import useGetProducts from '@/shared/models/product/useGetProducts';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '@/shared/types/product/product';

interface ProductListProps {
  sortBy: 'recent' | 'rating' | 'reviewCount';
}

const sortVariation = {
  recent: {
    title: '가장 최근 상품',
  },
  rating: {
    title: '베스트 상품',
  },
  reviewCount: {
    title: '가장 핫한 상품',
  },
};

const SortedProductList = ({ sortBy }: ProductListProps) => {
  const { data: products } = useGetProducts({
    order: sortBy,
  });
  return (
    <div className="mx-[20px] mb-[60px] flex-1 xl:mt-[60px] xl:border-var-black3">
      <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
        <p>
          {sortVariation[sortBy].title}&nbsp;
          <span className="bg-gradient-custom bg-clip-text text-transparent">
            TOP 6
          </span>
        </p>
      </h1>
      <div className="grid grid-cols-2 gap-[20px] xl:grid-cols-3">
        {products?.map((product: Product, idx: number) => {
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
  );
};

export default SortedProductList;
