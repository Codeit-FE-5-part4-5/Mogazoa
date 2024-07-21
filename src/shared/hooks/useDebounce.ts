import { useEffect, useState } from 'react';

const useDebounce = (value: string, time: number) => {
  const [deBounceValue, setDeBounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeBounceValue(value);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [time, value]);

  return { deBounceValue };
};

export default useDebounce;
