import { useEffect, useState } from 'react';

type TPendingTimeout = (isLoading?: boolean) => boolean;

const usePendingTimeout: TPendingTimeout = (isLoading) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isLoading) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timerId);
    };
  }, [isLoading]);

  return loading;
};

export default usePendingTimeout;
