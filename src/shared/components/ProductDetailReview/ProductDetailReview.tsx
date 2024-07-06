import reviewImg1 from '@/assets/review_image.png';
import Image from 'next/image';
import ThumbsChip from '../Chip/ThumbsChip';
import textSvg from '@/assets/Ellipse48.svg';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  count: number;
  isLikedByMe: boolean;
  setLikedByMe: Dispatch<SetStateAction<boolean>>;
  user: any;
  content: any;
}

const ProductDetailReview = ({
  count,
  isLikedByMe,
  setLikedByMe,
  user,
  content,
}: Props) => {
  return (
    <div className="justify-between rounded-[12px] border border-[#353542] bg-[#252530] px-[20px] py-[20px] md:flex md:gap-[30px] md:py-[20px] xl:gap-[70px] xl:rounded-[12px] xl:px-[20px] xl:py-[25px]">
      <div className="mb-[20px] flex gap-[10px] md:min-w-[160px]">
        <div className="flex h-[36px] w-[36px] overflow-hidden rounded-full bg-blue-50 md:h-[42px] md:w-[42px]">
          <Image src={textSvg} alt="테스트" layout="intrinsic" />
        </div>
        <div>
          <div className="text-var-white mb-[5px] text-[14px] font-normal xl:text-[16px]">
            {user.name}
          </div>
          <div className="flex gap-[3px]">
            {Array(user.star)
              .fill('')
              .map((_, index) => {
                return (
                  <img
                    key={index}
                    src="/images/star.svg"
                    alt={`star-${index}`}
                    className="h-[10px] xl:h-[16px]"
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <div className="text-gradient mb-[10px] text-[10px] font-normal">
          지원받고 남기는 리뷰입니다.
        </div>
        <div className="text-var-white text-[12px] font-normal leading-[16px] xl:text-[16px] xl:leading-[22px]">
          {content.description}
        </div>
        <ul className="mt-[20px] grid grid-cols-5 gap-[10px] xl:grid-cols-6 xl:gap-[20px]">
          <li className="relative">
            <Image src={reviewImg1} alt="테스트1" layout="intrinsic" />
          </li>
          <li className="relative">
            <Image src={reviewImg1} alt="테스트1" layout="intrinsic" />
          </li>
          <li className="relative">
            <Image src={reviewImg1} alt="테스트1" layout="intrinsic" />
          </li>
          <li className="relative">
            <Image src={reviewImg1} alt="테스트1" layout="intrinsic" />
          </li>
          <li className="relative">
            <Image src={reviewImg1} alt="테스트1" layout="intrinsic" />
          </li>
        </ul>
        <div className="mt-[16px] flex items-end justify-between">
          <div className="flex gap-[15px]">
            <div className="text-var-gray1 text-[12px] font-normal">
              {content.createdAt}
            </div>
            <div className="text-var-gray2 flex gap-[10px] text-[12px] xl:text-[14px]">
              <button className="underline">수정</button>
              <button className="underline">삭제</button>
            </div>
          </div>
          <div>
            <ThumbsChip
              count={count}
              isLikedByMe={isLikedByMe}
              setLikedByMe={setLikedByMe}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailReview;
