import { RefObject, useEffect, useRef, useState } from 'react';

const useIntersectionObserver = <T extends HTMLElement>(): [
  target: RefObject<T>,
  isIntersecting: boolean,
] => {
  const [isIntersecting, setIntersecting] = useState(false);
  const target = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target.current]);

  return [target, isIntersecting];
};

export default useIntersectionObserver;
