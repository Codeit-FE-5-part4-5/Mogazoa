import { RefObject, useCallback, useEffect, useRef } from 'react';

const useIntersect = <T extends HTMLElement>(
  onIntersect: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opt?: IntersectionObserverInit,
): RefObject<T> => {
  const target = useRef<T>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
          observer.unobserve(entry.target);
        }
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (target.current === null) return;

    const observer = new IntersectionObserver(handleIntersect, opt);

    observer.observe(target.current);

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [target, onIntersect, opt, handleIntersect]);

  return target;
};

export default useIntersect;
