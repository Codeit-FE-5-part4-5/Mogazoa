import { SetStateAction } from 'react';

export const compareProducts = (
  a: number,
  b: number,
  setWinnerCount: React.Dispatch<SetStateAction<number>>,
) => {
  if (typeof a === 'number' && typeof b === 'number') {
    if (a > b) {
      setWinnerCount((prevCount) => prevCount + 1);
      return '상품 1 승리';
    } else if (a < b) {
      setWinnerCount((prevCount) => prevCount - 1);
      return '상품 2 승리';
    } else {
      return '무승부';
    }
  } else {
    return '-';
  }
};
