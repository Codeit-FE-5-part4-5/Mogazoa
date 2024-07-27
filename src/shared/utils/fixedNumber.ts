const fixedNumber = (number: number) => {
  if (number !== undefined && typeof number === 'number') {
    const numberString = number.toString();
    const decimalIndex = numberString.indexOf('.');

    if (decimalIndex !== -1 && numberString.length - decimalIndex - 1 > 2) {
      return Number(number.toFixed(1));
    }
  }
  return number;
};

export default fixedNumber;
