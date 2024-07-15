import { useEffect, useRef, useState } from 'react';

const useCompareDropdown = () => {
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
