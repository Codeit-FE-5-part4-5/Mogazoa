import React from 'react';
import { Chip } from '@/components/shared';

interface ActivityCardProps {
  status: 'averageLeft' | 'reviewsLeft' | 'interest';
  conScore?: number | undefined;
  text?: string | undefined;
  color?: string | undefined;
}

const ActivityCard = ({ status, conScore, text, color }: ActivityCardProps) => {
  const roundToOneDecimal = (num: number | undefined) => {
    if (num === undefined) return num;
    return Math.round(num * 10) / 10;
  };

  const config = {
    averageLeft: {
      name: '남긴 별점 평균',
      imgComponent: (
        <img src="/images/star.svg" alt="" className="h-[14px] xl:h-[22px]" />
      ),
      conScore: roundToOneDecimal(conScore),
    },

    reviewsLeft: {
      name: '남긴 리뷰',
      imgComponent: (
        <img
          src="/images/speechBubble.svg"
          alt=""
          className="h-[14px] xl:h-[22px]"
        />
      ),
      conScore,
    },

    interest: {
      name: '관심 카테고리',
      imgComponent: <Chip text={text ?? ''} color={color} size="s" />,
      conScore,
    },
  };

  const changeName = config[status].name;
  const changeImgComponent = config[status].imgComponent;
  const changeScore = config[status].conScore;

  return (
    <div className="flex h-full flex-col justify-center rounded-[12px] border border-[#353542] bg-[#252530] px-5 py-5 md:justify-end md:rounded-[8px] md:py-[30px] md:text-center xl:rounded-[12px]">
      <div className="items-center gap-[5px] md:flex md:flex-col md:gap-0">
        <div className="mb-[15px] text-center text-[14px] text-var-gray2 xl:mb-5 xl:text-[16px]">
          {changeName}
        </div>
        <div className="flex items-center justify-center gap-[5px] text-[16px] font-light text-var-gray2 md:mt-[15px] md:text-[20px] xl:mt-[20px] xl:text-[24px]">
          {changeImgComponent}
          {changeScore}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
