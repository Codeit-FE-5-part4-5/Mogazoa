/**
 *
 * @param hexString rgb로 변환시킬 헥스값 문자열
 * @returns [r, g, b]
 */
const useHexToRgb = (hexString: string): number[] => {
  const hex = hexString?.replace('#', '');

  const r = parseInt(hex?.substring(0, 2), 16);
  const g = parseInt(hex?.substring(2, 4), 16);
  const b = parseInt(hex?.substring(4, 6), 16);

  return [r, g, b];
};

export default useHexToRgb;
