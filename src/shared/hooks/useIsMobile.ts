import { useCallback, useEffect, useState } from 'react';

const useIsMobile = (): boolean => {
  const [isMobileSize, setMobileSize] = useState(false);

  const ChangeIsMobileSize = useCallback(() => {
    setMobileSize(window.innerWidth <= 767);
  }, []);

  useEffect(() => {
    ChangeIsMobileSize();
    window.addEventListener('resize', ChangeIsMobileSize);

    return () => {
      window.removeEventListener('resize', ChangeIsMobileSize);
    };
  }, [ChangeIsMobileSize]);

  return isMobileSize;
};

export default useIsMobile;
