import Image from 'next/image';
import Link from 'next/link';
import fixedNumber from '@/utils/fixedNumber';

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
      <div className="group cursor-pointer overflow-hidden rounded-[8px] border border-[#353542] bg-[#252530] transition-all duration-300 hover:border-gradient-custom xl:rounded-[12px]">
        <div className="relative h-[120px] overflow-hidden md:h-[160px] xl:h-[200px]">
          <Image
            fill
            src={image}
            alt="상품 사진"
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
          />
        </div>
        <div className="px-[12px] py-[12px]">
          <h3 className="text-[12px] font-medium text-var-white md:text-[16px]">
            {name}
          </h3>
          <div className="flex flex-col md:mt-[10px] md:flex-row md:justify-between">
            <ul className="my-[5px] flex gap-[10px] text-[12px] text-var-gray1 md:my-0 md:gap-[15px] md:text-[14px] xl:text-[16px]">
              <li>리뷰 {reviewCount}</li>
              <li>찜 {favoriteCount}</li>
            </ul>
            <div className="flex items-center gap-[4px]">
              <div className="relative size-[12px] md:size-[16px]">
                <Image src="/images/star.svg" alt="별점" fill />
              </div>
              <span className="text-[12px] text-var-gray2 md:text-[14px] xl:text-[16px]">
                {fixedNumber(rating)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
