import { useEffect, useState } from 'react';

const usePendingTimeout = (isLoading?: boolean) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timerId = setTimeout(() => {
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

  return [loading];
};

export default usePendingTimeout;
