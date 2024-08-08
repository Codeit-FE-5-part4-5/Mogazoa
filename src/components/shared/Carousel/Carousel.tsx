import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import fixedNumber from '@/utils/fixedNumber';
import { Product } from '@/types/product/product';
import useAnimation from '@/hooks/useAnimation';

interface CarouselProps {
  products: Product[];
  className: string;
  currentCategory: string;
}

const Carousel = ({ products, currentCategory, className }: CarouselProps) => {
  const [currentProduct, setCurrentProduct] = useState<Product>(products[0]);
  const [showDescription, setShowDescription] = useState(false);
  const [renderDescription, showDescriptionAnimate, handleAnimateDescription] =
    useAnimation(showDescription);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateProduct = () => {
      setCurrentProduct((prevProduct) => {
        const currentProductIdx = products.findIndex(
          (product) => product.id === prevProduct.id,
        );
        return products[currentProductIdx + 1] || products[0];
      });
    };

    timerIdRef.current = setInterval(updateProduct, 3000);

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [products]);

  if (products.length === 0) return null;

  return (
    <>
      <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
        {`${currentCategory}의`}&nbsp;
        <span className="bg-gradient-custom bg-clip-text text-transparent">
          TOP 6
        </span>
      </h1>
      <div
        className={cn(
          'relative flex h-[300px] w-full flex-col overflow-hidden rounded-[8px]',
          className,
        )}
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        <div className={cn('relative size-full')}>
          <Image
            src={currentProduct?.image}
            alt={String(currentProduct?.id)}
            fill
            className={cn('object-cover')}
          />
          {renderDescription && (
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-black/70 to-transparent',
                showDescriptionAnimate ? 'animate-fadeIn' : 'animate-fadeOut',
              )}
            />
          )}
          <div className="absolute bottom-0 flex w-full flex-col overflow-hidden shadow-2xl">
            {renderDescription && (
              <Carousel.CardDescription
                currentProduct={currentProduct}
                showDescriptionAnimate={showDescriptionAnimate}
                handleAnimateDescription={handleAnimateDescription}
              />
            )}
            <div className="flex h-[40px]">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/detail/${product?.id}`}
                  className={cn(
                    'group flex w-full items-center justify-center border-r border-var-black2 bg-var-black3 text-var-gray1 transition-colors duration-300 active:bg-var-black1 md:text-[16px]',
                    currentProduct?.name === product?.name && 'bg-var-black2',
                  )}
                  onMouseEnter={() => setCurrentProduct(product)}
                >
                  <span
                    className={cn(
                      'text-[12px] transition-all duration-300 group-hover:text-var-white',
                      currentProduct?.name === product?.name &&
                        'text-var-white',
                    )}
                  >
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Carousel.CardDescription = ({
  currentProduct,
  showDescriptionAnimate,
  handleAnimateDescription,
}: {
  currentProduct: Product;
  showDescriptionAnimate: boolean;
  handleAnimateDescription: () => void;
}) => {
  return (
    <Link href={`/detail/${currentProduct?.id}`}>
      <div
        className={cn(
          'flex animate-fadeIn cursor-pointer flex-col gap-[4px] p-[12px] font-semibold text-var-white',
          showDescriptionAnimate ? 'animate-fadeIn' : 'animate-fadeOut',
        )}
        onAnimationEnd={handleAnimateDescription}
      >
        <p className="text-[24px]">{currentProduct?.name}</p>
        <div className="flex gap-[12px] font-light text-var-gray2">
          <div className="flex gap-[8px]">
            <Image src="/images/star.svg" alt="별점" width={12} height={12} />
            {currentProduct && <p>{fixedNumber(currentProduct.rating)}</p>}
          </div>
          <div className="flex gap-[8px]">
            <Image src="/images/heart.svg" alt="별점" width={12} height={12} />
            <p>{currentProduct?.favoriteCount}</p>
          </div>
          <div className="flex gap-[8px]">
            <Image
              src="/images/speechBubble.svg"
              alt="별점"
              width={12}
              height={12}
            />
            <p>{currentProduct?.reviewCount}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Carousel;
