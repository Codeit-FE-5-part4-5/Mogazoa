const fixedNumber = <T>(number: number, status?: T) => {
  if (number !== undefined && typeof number === 'number') {
    const numberString = number.toString();
    const decimalIndex = numberString.indexOf('.');

    if (decimalIndex !== -1 && numberString.length - decimalIndex - 1 > 2) {
      if (status === 'average') {
        return Number(number.toFixed(1));
      }
      return Number(number.toFixed(0));
    }
  }
  return number;
};

export default fixedNumber;
