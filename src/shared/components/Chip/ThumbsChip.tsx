import useLikeReview from '@/shared/models/reviews/useLikeReview';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface ThumbsChipProps {
  count: number;
  isLikedByMe: boolean;
  reviewId: number;
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
}

const ThumbsChip = ({
  count = 0,
  isLikedByMe,
  reviewId,
  productId,
  order,
}: ThumbsChipProps) => {
  const { mutate } = useLikeReview({ reviewId, productId, order });

  const handleToggleLike = () => {
    mutate();
  };

  return (
    <button
      className="flex w-fit items-center gap-[5px] rounded-[100px] border border-var-black3 bg-var-black2 px-[12px] py-[6px] md:px-[10px]"
      onClick={handleToggleLike}
    >
      <div className="relative size-[14px] md:size-[18px]">
        <Image
          fill
          src={isLikedByMe ? '/thumbs-up-fill.svg' : '/thumbs-up.svg'}
          alt="따봉"
        />
      </div>
      <span
        className={`text-[12px] md:text-[14px] ${isLikedByMe ? 'text-[#5363FF]' : 'text-var-gray1'}`}
      >
        {count}
      </span>
    </button>
  );
};

export default ThumbsChip;
