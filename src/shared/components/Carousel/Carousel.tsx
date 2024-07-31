import { cn } from '@/lib/utils';
import { Product } from '@/shared/types/product/product';
import Image from 'next/image';
import { useState } from 'react';

interface CarouselProps {
  products: Product[];
  className: string;
}

const Carousel = ({ products, className }: CarouselProps) => {
  const [currentProduct, setCurrentProduct] = useState<Product>(products[0]);
  const handleClickCardButton = (product: Product) => {
    setCurrentProduct(product);
  };
  if (products.length === 0) return null;

  return (
    <div
      className={cn(
        'relative flex h-[300px] w-full flex-col overflow-hidden rounded-[8px]',
        className,
      )}
    >
      <div className="relative size-full">
        <Image
          src={currentProduct?.image}
          alt={String(currentProduct?.id)}
          fill
          className="object-cover"
        />
      </div>
      <Carousel.CardDescription currentProduct={currentProduct} />
      <div className="flex h-[60px] w-full overflow-hidden shadow-2xl">
        {products.map((product) => (
          <Carousel.List
            onMouseEnter={handleClickCardButton}
            currentProduct={currentProduct}
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.CardDescription = ({
  currentProduct,
}: {
  currentProduct: Product;
}) => {
  return (
    <div className="absolute flex flex-col gap-[4px] text-var-gray1">
      <p>{currentProduct.name}</p>
      <div className="flex gap-[12px]">
        <div className="flex gap-[8px]">
          <Image src="/images/star.svg" alt="별점" width={12} height={12} />
          <p>{currentProduct.rating}</p>
        </div>
        <div className="flex gap-[8px]">
          <Image src="/images/heart.svg" alt="별점" width={12} height={12} />
          <p>{currentProduct.favoriteCount}</p>
        </div>
        <div className="flex gap-[8px]">
          <Image
            src="/images/speechBubble.svg"
            alt="별점"
            width={12}
            height={12}
          />
          <p>{currentProduct.reviewCount}</p>
        </div>
      </div>
    </div>
  );
};

Carousel.List = ({
  onMouseEnter,
  currentProduct,
  product,
}: {
  onMouseEnter: (product: Product) => void;
  currentProduct: Product;
  product: Product;
}) => {
  return (
    <button
      type="button"
      className={cn(
        'w-full border-r border-var-black2 bg-var-black3 text-var-gray1',
        currentProduct?.name === product?.name && 'bg-var-black2',
      )}
      onMouseEnter={() => onMouseEnter(product)}
    >
      {product.name}
    </button>
  );
};

export default Carousel;
