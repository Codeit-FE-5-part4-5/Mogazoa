import { compareProducts } from '@/shared/models/product/compareProducts';
import { Product } from '@/shared/types/product/product';
import React, { SetStateAction } from 'react';

interface Props {
  integratedData: {
    product2?: Product | undefined;
    product1?: Product | undefined;
  };
  setWinnerCount: React.Dispatch<SetStateAction<number>>;
}

export const CompareTable = ({ integratedData, setWinnerCount }: Props) => {
  const { product1, product2 } = integratedData;

  return (
    <div className="rounded-[12px] border border-solid border-[#353542] bg-[rgb(37,37,48)] text-center text-[12px] md:text-[14px] xl:text-[16px]">
      <ul className="grid grid-cols-4 border-b border-solid border-b-[#353542] py-[15px] text-var-gray2 md:py-[20px]">
        <li>기준</li>
        <li>상품 1</li>
        <li>상품 2</li>
        <li>결과</li>
      </ul>
      <ul className="grid grid-cols-4 py-[15px] md:py-[30px]">
        <li className="text-var-gray2">별점</li>
        <li>{product1?.rating ?? '-'}</li>
        <li>{product2?.rating ?? '-'}</li>
        <li className="text-var-pink">
          {compareProducts(
            product1?.rating || 0,
            product2?.rating || 0,
            setWinnerCount,
          )}
        </li>
      </ul>
      <ul className="grid grid-cols-4 py-[15px] md:py-[30px]">
        <li className="text-var-gray2">리뷰 개수</li>
        <li>{product1?.reviewCount ?? '-'}</li>
        <li>{product2?.reviewCount ?? '-'}</li>
        <li className="text-var-pink">
          {compareProducts(
            product1?.reviewCount || 0,
            product2?.reviewCount || 0,
            setWinnerCount,
          )}
        </li>
      </ul>
      <ul className="grid grid-cols-4 py-[15px] md:py-[30px]">
        <li className="text-var-gray2">찜 개수</li>
        <li>{product1?.favoriteCount ?? '-'}</li>
        <li>{product2?.favoriteCount ?? '-'}</li>
        <li className="text-var-pink">
          {compareProducts(
            product1?.favoriteCount || 0,
            product2?.favoriteCount || 0,
            setWinnerCount,
          )}
        </li>
      </ul>
    </div>
  );
};
