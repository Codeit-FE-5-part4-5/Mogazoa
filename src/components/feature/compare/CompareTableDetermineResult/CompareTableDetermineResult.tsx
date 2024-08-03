import React from 'react';
import getWinnerInfo from '@/lib/compare/getWinnerInfo';

// 0 일경우 무승부, 양수 일경우 상품1 승리, 음수일 경우 상품2 승리
const CompareTableDetermineResult = (
  winnerCount: number[],
  product: {
    productName1: string | undefined;
    productName2: string | undefined;
  },
) => {
  const [productWinner1, productWinner2] = winnerCount;
  const drawCount = productWinner1 - productWinner2;

  const { text, color, description } = getWinnerInfo(
    productWinner1,
    productWinner2,
    drawCount,
    product,
  );
  const isNotDraw = drawCount !== 0;
  const winOrLoseCon = isNotDraw && (
    <span>
      상품이
      <br className="md:inline-block md:px-[2px] md:content-['']" />
      승리하였습니다!
    </span>
  );

  return (
    <div className="text-center">
      <span className="text-[20px] font-semibold leading-[28px] text-var-white xl:text-[24px] xl:leading-normal">
        <span className={color}>{text}</span> {winOrLoseCon}
      </span>
      {isNotDraw && (
        <div className="mt-[20px] text-[12px] font-normal text-var-gray2 xl:text-[16px]">
          3가지 항목 중 {description} 항목에서 우세합니다.
        </div>
      )}
    </div>
  );
};

export default CompareTableDetermineResult;
