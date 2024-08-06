import { useCallback, useEffect, useState } from 'react';

const useSticky = (startPointPx: number = 30) => {
  const [isSticky, setSticky] = useState(false);

  const handleNavigation = useCallback(() => {
    setSticky(window.scrollY > startPointPx);
  }, [startPointPx]);

  useEffect(() => {
    const scrollEvent = setInterval(() => {
      window.addEventListener('scroll', handleNavigation);
    }, 100);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(scrollEvent);
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return isSticky;
};

export default useSticky;
