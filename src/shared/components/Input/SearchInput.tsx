import Image from 'next/image';
import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
} from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const searchInputClosedStyle = 'border border-var-black3 w-[30px]';
const searchInputOpenStyle =
  'w-[90%] md:w-[300px] xl:w-[400px] border-gradient-custom';

const SearchInput = ({
  className,
  isOpen,
  setOpen,
  ...props
}: SearchInputProps) => {
  const classNames = className || '';
  useEffect(() => {});
  return (
    <label
      onClick={(e) => e.stopPropagation()}
      className="group relative flex w-full justify-end transition-all md:inline-block md:w-fit"
    >
      <input
        className={`${classNames} ${isOpen ? searchInputOpenStyle : searchInputClosedStyle} flex h-[42px] flex-col items-start justify-center gap-[10px] rounded-[28px] border border-var-black3 bg-[#252530] p-[16px_20px] text-white placeholder-var-gray1 outline-none transition-all duration-300 group-hover:bg-[#17171C] group-hover:border-gradient-custom`}
        {...props}
      />
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="absolute right-[10px] top-[50%] -translate-y-1/2"
      >
        <Image
          src={isOpen ? '/images/closedIcon.svg' : '/images/search.svg'}
          alt={isOpen ? '/images/search.svg' : '/images/closedIcon.svg'}
          width={24}
          height={24}
        />
      </button>
    </label>
  );
};

export default SearchInput;
