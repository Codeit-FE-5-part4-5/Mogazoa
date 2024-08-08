const compareProducts = (a: number, b: number): string => {
  if (a > b) {
    return '상품 1 승리';
  }
  if (a < b) {
    return '상품 2 승리';
  }
  return '무승부';
};

export default compareProducts;
