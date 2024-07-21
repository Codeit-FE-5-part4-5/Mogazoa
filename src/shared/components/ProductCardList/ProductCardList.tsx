import { Product } from '@/shared/types/product/product';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../Spinner/Spinner';
import Image from 'next/image';

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
    return (
      <div className="mb-[120px] mt-[80px] flex flex-col items-center gap-[20px]">
        <div className="relative h-[32px] w-[39px] xl:h-[40px] xl:w-[49px]">
          <Image
            src={'/images/firstComment.svg'}
            alt={'첫번째 상품을 등록해보세요.'}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="text-center text-lg font-normal leading-normal text-[#6E6E82]">
          해당하는 상품이 없습니다
        </p>
      </div>
    );
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
