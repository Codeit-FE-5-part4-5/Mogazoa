import { RefObject, useCallback, useEffect, useRef } from 'react';

/**
 *
 * @param {function} setter 외부요소 클릭했을때 실행할 함수
 * @returns {RefObject} 외부 요소에 해당하지 않는 내부 요소
 */
const useClickOutside = <T extends HTMLElement>(
  setter: (arg: boolean) => void,
): RefObject<T> => {
  const target = useRef<T>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (target.current && !target.current.contains(e.target as Node)) {
        setter(false);
      }
    },
    [setter],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return target;
};

export default useClickOutside;
