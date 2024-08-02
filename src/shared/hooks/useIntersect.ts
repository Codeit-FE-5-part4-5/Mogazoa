import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

type TIntersect = <T extends HTMLElement>(
  once: boolean,
) => [RefObject<T>, boolean];

type THandleIntersect = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

const useIntersect: TIntersect = (once = false) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const target = useRef(null);

  const handleIntersect: THandleIntersect = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        setIntersecting(entry.isIntersecting);
        if (once && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    },
    [once],
  );

  useEffect(() => {
    if (target.current === null) return;

    const observer = new IntersectionObserver(handleIntersect);

    observer.observe(target.current);

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [target, handleIntersect]);

  return [target, isIntersecting];
};

export default useIntersect;
