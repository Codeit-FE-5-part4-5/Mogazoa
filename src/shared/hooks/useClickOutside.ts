import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';

const useClickOutside = <T extends HTMLElement>(
  setter: Dispatch<SetStateAction<boolean>>,
): RefObject<T> => {
  const target = useRef<T>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (target.current && !target.current.contains(e.target as Node)) {
      setter(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [target.current]);

  return target;
};

export default useClickOutside;
