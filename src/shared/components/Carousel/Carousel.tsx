import { cn } from '@/lib/utils';
import useAnimation from '@/shared/hooks/useAnimation';
import { Product } from '@/shared/types/product/product';
import fixedNumber from '@/shared/utils/fixedNumber';
import Image from 'next/image';
import { useState } from 'react';

interface CarouselProps {
  products: Product[];
  className: string;
}

const Carousel = ({ products, className }: CarouselProps) => {
  const [currentProduct, setCurrentProduct] = useState<Product>(products[0]);
  const [showDescription, setShowDescription] = useState(false);
  const [shouldRender, animationTrigger, handleAnimationEnd] =
    useAnimation(showDescription);

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
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <div className="relative size-full">
        <Image
          src={currentProduct?.image}
          alt={String(currentProduct?.id)}
          fill
          className="object-cover"
        />
        {shouldRender && (
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/70 to-transparent',
              animationTrigger ? 'animate-fadeIn' : 'animate-fadeOut',
            )}
          />
        )}
        <div className="absolute bottom-0 flex w-full flex-col overflow-hidden shadow-2xl">
          {shouldRender && (
            <>
              <Carousel.CardDescription
                currentProduct={currentProduct}
                animationTrigger={animationTrigger}
                handleAnimationEnd={handleAnimationEnd}
              />
              <div className="flex h-[40px]">
                <Carousel.List
                  animationTrigger={animationTrigger}
                  onMouseEnter={handleClickCardButton}
                  currentProduct={currentProduct}
                  products={products}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Carousel.CardDescription = ({
  currentProduct,
  animationTrigger,
  handleAnimationEnd,
}: {
  currentProduct: Product;
  animationTrigger: boolean;
  handleAnimationEnd: () => void;
}) => {
  return (
    <div
      className={cn(
        'flex animate-fadeIn flex-col gap-[4px] p-[12px] font-semibold text-var-white',
        animationTrigger ? 'animate-fadeIn' : 'animate-fadeOut',
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      <p className="text-[24px]">{currentProduct.name}</p>
      <div className="flex gap-[12px] font-light text-var-gray2">
        <div className="flex gap-[8px]">
          <Image src="/images/star.svg" alt="별점" width={12} height={12} />
          <p>{fixedNumber(currentProduct.rating)}</p>
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
  animationTrigger,
  onMouseEnter,
  currentProduct,
  products,
}: {
  animationTrigger: boolean;
  onMouseEnter: (product: Product) => void;
  currentProduct: Product;
  products: Product[];
}) => {
  return products.map((product) => (
    <button
      key={product.id}
      type="button"
      className={cn(
        'w-full border-r border-var-black2 bg-var-black3 text-[12px] text-var-gray1 transition-colors duration-300 active:bg-var-black1 md:text-[16px]',
        currentProduct?.name === product?.name && 'bg-var-black2',
        animationTrigger ? 'animate-fadeIn' : 'animate-fadeOut',
      )}
      onMouseEnter={() => onMouseEnter(product)}
    >
      {product.name}
    </button>
  ));
};

export default Carousel;
