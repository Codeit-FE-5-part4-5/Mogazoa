import { useEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobileSize, setMobileSize] = useState(false);

  const ChangeIsMobileSize = () => {
    setMobileSize(window.innerWidth <= 767);
  };

  useEffect(() => {
    ChangeIsMobileSize();
    window.addEventListener('resize', ChangeIsMobileSize);

    return () => {
      window.removeEventListener('resize', ChangeIsMobileSize);
    };
  }, []);

  return isMobileSize;
}
