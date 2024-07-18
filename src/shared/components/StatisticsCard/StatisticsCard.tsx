import React from 'react';

interface StatisticsCardProps {
  status: 'average' | 'steamed' | 'review';
  conScore: number;
  scoreDiff: number;
}

const StatisticsCard = ({
  status,
  conScore,
  scoreDiff,
}: StatisticsCardProps) => {
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

  function useToFixedNumber(number: number) {
    if (number !== undefined && typeof number === 'number') {
      const numberString = number.toString();
      const decimalIndex = numberString.indexOf('.');

      if (decimalIndex !== -1 && numberString.length - decimalIndex - 1 > 2) {
        if (status === 'average') {
          return number.toFixed(1);
        } else {
          return number.toFixed(0);
        }
      } else {
        return number;
      }
    }
  }

  const score = useToFixedNumber(conScore);
  const diffScore = useToFixedNumber(scoreDiff) as number;

  return (
    <>
      <div className="rounded-[12px] border border-[#353542] bg-[#252530] px-5 py-5 md:rounded-[8px] md:py-[30px] md:text-center xl:rounded-[12px]">
        <div className="flex items-center gap-[5px] md:flex-col md:gap-0">
          <div className="text-[14px] text-var-white md:text-[16px] xl:text-[18px]">
            {changeName}
          </div>
          <div className="flex items-center gap-[5px] text-[16px] font-light text-var-gray2 md:mt-[15px] md:text-[20px] xl:mt-[20px] xl:text-[24px]">
            {changeImgComponent} {score}
          </div>
        </div>
        <div className="flex md:items-center md:justify-center md:text-center">
          {status === 'average' ? (
            <div className="col-span-2 mt-[5px] text-[12px] font-light text-var-gray1 md:col-auto md:mt-[15px] md:leading-[18px] xl:mt-[20px] xl:text-[14px] xl:leading-[20px]">
              같은 카테고리의 제품들보다
              <div className="inline md:block">
                <span className="font-normal text-var-white">
                  {diffScore}점
                </span>{' '}
                {diffScore >= 0 ? '더 높아요!' : '더 적어요!'}
              </div>
            </div>
          ) : (
            <div className="col-span-2 mt-[5px] text-[12px] font-light text-var-gray1 md:col-auto md:mt-[15px] md:leading-[18px] xl:mt-[20px] xl:text-[14px] xl:leading-[20px]">
              같은 카테고리의 제품들보다
              <div className="inline md:block">
                <span className="font-normal text-var-white">
                  {diffScore}개
                </span>{' '}
                {diffScore >= 0 ? '더 많아요!' : '더 적어요!'}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatisticsCard;
