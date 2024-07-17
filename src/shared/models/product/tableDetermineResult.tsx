import React from 'react';

// 0 일경우 무승부, 양수 일경우 상품1 승리, 음수일 경우 상품2 승리
export const tableDetermineResult = (
  winnerCount: number,
  product: {
    productName1: string | undefined;
    productName2: string | undefined;
  },
) => {
  const getWinnerInfo = () => {
    if (winnerCount === 0) {
      return {
        text: '무승부 입니다!',
        color: 'text-var-white',
        description: '',
      };
    } else if (winnerCount > 0) {
      return {
        text: `${product.productName1 ?? ''}`,
        color: 'text-var-pink',
        description: `${Math.abs(winnerCount)}가지`,
      };
    } else {
      return {
        text: `${product.productName2 ?? ''}`,
        color: 'text-var-green',
        description: `${Math.abs(winnerCount)}가지`,
      };
    }
  };

  const { text, color, description } = getWinnerInfo();

  return (
    <>
      <div className="text-center">
        <span className="text-[20px] font-semibold leading-[28px] text-var-white xl:text-[24px] xl:leading-normal">
          <span className={color}>{text}</span> 상품이
          <br className="md:inline-block md:px-[2px] md:content-['']" />
          승리하였습니다!
        </span>
        {winnerCount !== 0 && (
          <div className="mt-[20px] text-[12px] font-normal text-var-gray2 xl:text-[16px]">
            3가지 항목 중 {description} 항목에서 우세합니다.
          </div>
        )}
      </div>
    </>
  );
};
