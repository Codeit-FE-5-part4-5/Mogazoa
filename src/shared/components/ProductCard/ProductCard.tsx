import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCard {
  id: number;
  image: string;
  name: string;
  reviewCount: number;
  favoriteCount: number;
  rating: number;
}

const ProductCard = ({
  id,
  name,
  image,
  reviewCount,
  favoriteCount,
  rating,
}: ProductCard) => {
  return (
    <Link href={`/detail/${id}`}>
      <div className="group cursor-pointer rounded-[8px] border border-[#353542] bg-[#252530] px-[10px] py-[10px] hover:border-gradient-custom md:py-[20px] xl:rounded-[12px] xl:px-[20px] xl:py-[25px]">
        <div className="relative h-[98px] overflow-hidden md:h-[160px] xl:h-[200px]">
          <Image
            fill
            src={image}
            alt="상품 사진"
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
          />
        </div>
        <div className="mt-[10px] md:mt-[20px] xl:mt-[25px]">
          <h3 className="text-[14px] font-medium text-var-white md:text-[16px] xl:text-[18px]">
            {name}
          </h3>
          <div className="flex flex-col md:mt-[10px] md:flex-row md:justify-between">
            <ul className="my-[5px] flex gap-[10px] text-[12px] text-var-gray1 md:my-0 md:gap-[15px] md:text-[14px] xl:text-[16px]">
              <li>리뷰 {reviewCount}</li>
              <li>찜 {favoriteCount}</li>
            </ul>
            <div className="flex items-center gap-[2px]">
              <img
                src="/images/star.svg"
                alt=""
                className="h-[12px] md:h-[16px]"
              />
              <span className="text-[12px] text-var-gray2 md:text-[14px] xl:text-[16px]">
                {rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
