import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface ThumbsChipProps {
  count: number;
  isLikedByMe: boolean;
  setLikedByMe: Dispatch<SetStateAction<boolean>>;
}

export default function ThumbsChip({
  count = 0,
  isLikedByMe = false,
  setLikedByMe,
}: ThumbsChipProps) {
  return (
    <button
      className="flex w-fit items-center gap-[5px] rounded-[100px] border border-var-black3 bg-var-black2 px-[12px] py-[6px] md:px-[10px]"
      onClick={() => setLikedByMe((prev) => !prev)}
    >
      <div className="relative size-[14px] md:size-[18px]">
        <Image
          fill
          src={isLikedByMe ? '/thumbs-up-fill.svg' : '/thumbs-up.svg'}
          alt="따봉"
        />
      </div>
      <span
        className={`text-[12px] md:text-[14px] ${isLikedByMe ? 'text-var-pink' : 'text-var-gray1'}`}
      >
        {count}
      </span>
    </button>
  );
}
