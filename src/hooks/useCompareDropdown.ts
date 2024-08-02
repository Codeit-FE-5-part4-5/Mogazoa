import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

type TCompareDropdown = () => {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dropDownElementRef: RefObject<HTMLDivElement>;
};

const useCompareDropdown: TCompareDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownElementRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownElementRef.current &&
      !dropDownElementRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
    dropDownElementRef,
  };
};

export default useCompareDropdown;
