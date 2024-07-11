import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  setter: Dispatch<SetStateAction<boolean>>,
): void => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setter(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
};

export default useClickOutside;
