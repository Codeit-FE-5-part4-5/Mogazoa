import React from 'react';
import reviewImg1 from '@/assets/review_image.png';
import Image from 'next/image';

const ReviewProfileCard = ({ user }: any) => {
  return (
    <>
      <div className="flex items-center gap-[10px]">
        <div className="relative flex h-[36px] w-[36px] overflow-hidden rounded-full bg-blue-50 md:h-[42px] md:w-[42px]">
          <Image src={reviewImg1} alt="테스트" fill />
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="text-[14px] font-normal text-var-white md:text-[16px]">
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
                    className="h-[10px] md:h-[16px]"
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewProfileCard;
