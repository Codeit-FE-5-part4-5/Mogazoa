import fixedNumber from '@/shared/utils/fixedNumber';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
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
}: ProductCardProps) => {
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
              <div className="relative size-[12px] md:size-[16px]">
                <Image src="/images/star.svg" alt="별점" fill />
              </div>
              <span className="text-[12px] text-var-gray2 md:text-[14px] xl:text-[16px]">
                {fixedNumber(rating, 'average')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
