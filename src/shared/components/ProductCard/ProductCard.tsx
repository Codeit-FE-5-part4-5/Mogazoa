import React from 'react';

interface ProductCard {
  image: string;
  name: string;
  reviewCount: number;
  favoriteCount: number;
  rating: number;
}

const ProductCard = ({
  name,
  image,
  reviewCount,
  favoriteCount,
  rating,
}: ProductCard) => {
  return (
    <div className="rounded-[8px] border border-[#353542] bg-[#252530] px-[10px] py-[10px] md:py-[20px] xl:rounded-[12px] xl:px-[20px] xl:py-[25px]">
      <div className="flex justify-center">
        <img
          src={image}
          alt=""
          className="h-[98px] w-[140px] md:h-[160px] md:w-[226px] xl:h-[200px] xl:w-[284px]"
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
  );
};

export default ProductCard;
