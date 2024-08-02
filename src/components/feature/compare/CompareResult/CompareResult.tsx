import React from 'react';
import { Product } from '@/types/product/product';

interface Props {
  winnerCount: number[];
  integratedData: {
    product2?: Product | undefined;
    product1?: Product | undefined;
  };
}

// 0 일경우 무승부, 양수 일경우 상품1 승리, 음수일 경우 상품2 승리
const tableDetermineResult = (
  winnerCount: number[],
  product: {
    productName1: string | undefined;
    productName2: string | undefined;
  },
) => {
  const productWinner1 = winnerCount[0];
  const productWinner2 = winnerCount[1];
  const drawCount = productWinner1 - productWinner2;

  const getWinnerInfo = () => {
    if (drawCount === 0) {
      return {
        text: '무승부 입니다!',
        color: 'text-var-white',
        description: '',
      };
    }
    if (drawCount > 0) {
      return {
        text: `${product.productName1 ?? ''}`,
        color: 'text-var-pink',
        description: `${Math.abs(productWinner1)}가지`,
      };
    }
    return {
      text: `${product.productName2 ?? ''}`,
      color: 'text-var-green',
      description: `${Math.abs(productWinner2)}가지`,
    };
  };

  const { text, color, description } = getWinnerInfo();
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

// test
const CompareResult = ({ winnerCount, integratedData }: Props) => {
  const product = {
    productName1: integratedData.product1?.name,
    productName2: integratedData.product2?.name,
  };

  return tableDetermineResult(winnerCount, product);
};

export default CompareResult;
