import React from 'react';

interface StatisticsCardProps {
  status: 'average' | 'steamed' | 'review';
  conScore: number;
}

const StatisticsCard = ({ status, conScore }: StatisticsCardProps) => {
  const config = {
    average: {
      name: '별점 평균',
      imgComponent: (
        <img src="/images/star.svg" alt="" className="h-[14px] xl:h-[22px]" />
      ),
    },
    steamed: {
      name: '찜',
      imgComponent: (
        <img src="/images/heart.svg" alt="" className="h-[14px] xl:h-[22px]" />
      ),
    },
    review: {
      name: '리뷰',
      imgComponent: (
        <img
          src="/images/speechBubble.svg"
          alt=""
          className="h-[14px] xl:h-[22px]"
        />
      ),
    },
  };

  const changeName = config[status].name;
  const changeImgComponent = config[status].imgComponent;

  return (
    <>
      <div className="rounded-[12px] border border-[#353542] bg-[#252530] px-5 py-5 md:rounded-[8px] md:py-[30px] md:text-center xl:rounded-[12px]">
        <div className="flex items-center gap-[5px] md:flex-col md:gap-0">
          <div className="text-var-white text-[14px] md:text-[16px] xl:text-[18px]">
            {changeName}
          </div>
          <div className="text-var-gray2 flex items-center gap-[5px] text-[16px] font-light md:mt-[15px] md:text-[20px] xl:mt-[20px] xl:text-[24px]">
            {changeImgComponent}
            {conScore}
          </div>
        </div>
        <div className="flex md:items-center md:justify-center md:text-center">
          <div className="text-var-gray1 col-span-2 mt-[5px] text-[12px] font-light md:col-auto md:mt-[15px] md:leading-[18px] xl:mt-[20px] xl:text-[14px] xl:leading-[20px]">
            같은 카테고리의 제품들보다{' '}
            <div className="inline md:block">
              <span className="text-var-white font-normal">0.8점</span> 더
              높아요!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsCard;
