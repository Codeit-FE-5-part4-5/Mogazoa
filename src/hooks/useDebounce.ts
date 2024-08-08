import { useEffect, useState } from 'react';

/**
 *
 * @param {string} value 디바운스를 걸 요소
 * @param {number} time 디바운스를 줄 시간
 * @returns {string} deBounceValue - 디바운스 결과값
 */
const useDebounce = (value: string, time: number): string => {
  const [deBounceValue, setDeBounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeBounceValue(value);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [time, value]);

  return deBounceValue;
};

export default useDebounce;
