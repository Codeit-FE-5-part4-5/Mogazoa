import { Product } from '@/shared/types/product/product';
import ProductCard from '../ProductCard/ProductCard';

interface ProductCardListProps {
  products: Product[];
}

const ProductCardList: React.FC<ProductCardListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
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
