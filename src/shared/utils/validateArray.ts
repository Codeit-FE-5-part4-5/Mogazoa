// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateArray = (arr: any, idx = 0) => {
  return Array.isArray(arr) ? arr[idx] : arr;
};

export default validateArray;
