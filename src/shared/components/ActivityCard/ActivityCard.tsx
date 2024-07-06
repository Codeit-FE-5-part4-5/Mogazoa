import React from 'react';
import Chip from '../Chip/Chip';

interface ActivityCardProps {
  status: 'averageLeft' | 'reviewsLeft' | 'interest';
  conScore?: number | undefined;
  text?: string | undefined;
  color?: string | undefined;
}

const ActivityCard = ({ status, conScore, text, color }: ActivityCardProps) => {
  const config = {
    averageLeft: {
      name: '남긴 별점 평균',
      imgComponent: (
        <img src="/images/star.svg" alt="" className="h-[14px] xl:h-[22px]" />
      ),
      conScore: conScore,
    },

    interest: {
      name: '남긴 리뷰',
      imgComponent: (
        <img
          src="/images/speechBubble.svg"
          alt=""
          className="h-[14px] xl:h-[22px]"
        />
      ),
      conScore: conScore,
    },

    reviewsLeft: {
      name: '관심 카테고리',
      imgComponent: <Chip text={text ?? ''} color={color} />,
      conScore: conScore,
    },
  };

  const changeName = config[status].name;
  const changeImgComponent = config[status].imgComponent;
  const changeScore = config[status].conScore;

  return (
    <>
      <div className="rounded-[12px] border border-[#353542] bg-[#252530] px-5 py-5 md:rounded-[8px] md:py-[30px] md:text-center xl:rounded-[12px]">
        <div className="items-center gap-[5px] md:flex md:flex-col md:gap-0">
          <div className="text-var-gray2 mb-[15px] text-center text-[14px] xl:mb-5 xl:text-[16px]">
            {changeName}
          </div>
          <div className="text-var-gray2 flex items-center justify-center gap-[5px] text-[16px] font-light md:mt-[15px] md:text-[20px] xl:mt-[20px] xl:text-[24px]">
            {changeImgComponent}
            {changeScore ? changeScore : ''}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
