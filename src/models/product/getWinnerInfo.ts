const getWinnerInfo = (
  productWinner1: number,
  productWinner2: number,
  drawCount: number,
  product: {
    productName1: string | undefined;
    productName2: string | undefined;
  },
) => {
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

export default getWinnerInfo;
