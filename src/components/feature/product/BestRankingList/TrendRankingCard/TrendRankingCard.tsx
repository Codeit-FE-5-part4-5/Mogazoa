import { Product } from '@/types/product/product';
import convertToK from '@/utils/convertToK';
import Image from 'next/image';
import Link from 'next/link';

interface TrendRankingCardProps {
  product: Product;
}

const TrendRankingCard = ({ product }: TrendRankingCardProps) => {
  if (!product) return null;
  return (
    <Link href={`/detail/${product.id}`} className="flex-shrink-0 xl:w-full">
      <div className="flex w-full items-center gap-[8px] rounded-[16px] px-[20px] py-[10px] text-var-white transition-all duration-300 hover:bg-[#252530]">
        <div className="relative flex size-[40px] flex-shrink-0 overflow-hidden">
          <Image
            src={product.image || 'images/user-no-image.svg'}
            alt={product.image || '이미지 없음'}
            style={{
              objectFit: 'contain',
            }}
            fill
            loading="eager"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-[8px] xl:flex-row">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="line-clamp-1 flex-1 text-[14px] font-semibold">
                {product.name}
              </div>
            </div>
            <ul className="flex gap-3.5 text-[10px] font-light text-var-gray1 md:text-[12px]">
              <li>찜 {convertToK(product.favoriteCount)}</li>
              <li>리뷰 {convertToK(product.reviewCount)}</li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendRankingCard;
