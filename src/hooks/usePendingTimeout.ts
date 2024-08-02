import { useEffect, useState } from 'react';

type TPendingTimeout = (isLoading?: boolean, time?: number) => boolean;

/**
 *
 * @param {boolean} isLoading 텀을 두고 동작을 실행하기 위해 필요한 불리언
 * @param {number} time 얼마나 텀을 둘지
 * @returns {boolean} loading - 정해준 시간이 지나면 true로 바뀌는 불리언값
 */
const usePendingTimeout: TPendingTimeout = (isLoading, time) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isLoading) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, time ?? 400);

    return () => {
      clearTimeout(timerId);
    };
  }, [isLoading]);

  return loading;
};

export default usePendingTimeout;
