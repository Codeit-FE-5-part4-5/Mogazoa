import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    document.addEventListener('resize', handleWindowSize);

    return () => {
      document.removeEventListener('resize', handleWindowSize);
    };
  }, []);

  return windowSize;
}
