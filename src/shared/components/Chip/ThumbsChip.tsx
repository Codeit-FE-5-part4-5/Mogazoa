import useLikeReview from '@/shared/models/reviews/useLikeReview';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useModal } from '@/shared/store/use-modal-store';

interface ThumbsChipProps {
  count: number;
  isLikedByMe: boolean;
  reviewId: number;
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
  isLoggin: boolean;
}

const ThumbsChip = ({
  count = 0,
  isLikedByMe,
  reviewId,
  productId,
  order,
  isLoggin,
}: ThumbsChipProps) => {
  const { mutate } = useLikeReview({ reviewId, productId, order });
  const { onOpen } = useModal();

  const handleToggleLike = () => {
    if (isLoggin) {
      mutate();
    } else {
      onOpen('login');
    }
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
