import { Product } from '@/shared/types/product/product';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../Spinner/Spinner';

interface ProductCardListProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductCardList: React.FC<ProductCardListProps> = ({
  products,
  isLoading = false,
}) => {
  if (isLoading) {
    return <Spinner isLoading />;
  }

  if (!products || products.length === 0) {
    return <div>상품이 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-5 overflow-y-scroll xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          reviewCount={product.reviewCount}
          favoriteCount={product.favoriteCount}
          rating={product.rating}
        />
      ))}
    </div>
  );
};

export default ProductCardList;
