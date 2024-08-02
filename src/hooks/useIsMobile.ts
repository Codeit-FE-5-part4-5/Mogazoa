import { useCallback, useEffect, useState } from 'react';

/**
 *
 * @returns {boolean} isMobileSize - 현재 브라우저가 모바일 사이즈면 true, 아니면 false
 */
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
