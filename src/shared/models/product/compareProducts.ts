export const compareProducts = (a: number, b: number): string => {
  if (a > b) {
    return '상품 1 승리';
  } else if (a < b) {
    return '상품 2 승리';
  } else {
    return '무승부';
  }
};
