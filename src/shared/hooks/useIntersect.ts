import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

const useIntersect = <T extends HTMLElement>(
  once: boolean = false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opt?: IntersectionObserverInit,
): [RefObject<T>, boolean] => {
  const [isIntersecting, setIntersecting] = useState(false);
  const target = useRef<T>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        setIntersecting(entry.isIntersecting);
        if (once && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    },
    [once, opt],
  );

  useEffect(() => {
    if (target.current === null) return;

    const observer = new IntersectionObserver(handleIntersect, opt);

    observer.observe(target.current);

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [target, opt, handleIntersect]);

  return [target, isIntersecting];
};

export default useIntersect;
