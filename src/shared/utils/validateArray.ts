export const validateArray = (arr: any, idx = 0) => {
  return Array.isArray(arr) ? arr[idx] : arr;
};
