import { RefObject, useEffect, useRef, useState } from 'react';

const useIntersectionObserver = <T extends HTMLElement>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opt: any,
): [target: RefObject<T>, isIntersecting: boolean] => {
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
  }, [opt]);

  return [target, isIntersecting];
};

export default useIntersectionObserver;
