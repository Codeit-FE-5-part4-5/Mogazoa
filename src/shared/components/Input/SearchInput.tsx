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
  searchQuery: string;
  initKeyword: () => void;
}

const searchInputClosedStyle =
  'border border-var-black3 w-[30px] cursor-pointer';
const searchInputOpenStyle =
  'w-[90%] md:w-[300px] xl:w-[400px] border-gradient-custom';

const SearchInput = ({
  className,
  searchQuery,
  isOpen,
  setOpen,
  value,
  initKeyword,
  ...props
}: SearchInputProps) => {
  useEffect(() => {
    if (!searchQuery) initKeyword();
  }, [isOpen]);

  return (
    <label
      onClick={() => setOpen((prev) => !prev)}
      className="group relative flex w-full justify-end transition-all md:inline-block md:w-fit"
    >
      <input
        value={value}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && initKeyword()}
        className={`${className || ''} ${isOpen ? searchInputOpenStyle : searchInputClosedStyle} flex h-[42px] flex-col items-start justify-center gap-[10px] rounded-[28px] border border-var-black3 bg-[#252530] p-[16px_20px] text-var-gray2 placeholder-var-gray1 outline-none transition-all duration-300 group-hover:bg-[#17171C] group-hover:border-gradient-custom`}
        {...props}
      />
      <div className="absolute right-[10px] top-[50%] flex -translate-y-1/2 cursor-pointer items-center gap-[15px]">
        {value && isOpen && (
          <button
            type="button"
            className="rounded-[16px] p-[4px] transition-colors duration-300 hover:bg-var-gray1"
            onClick={(e) => {
              e.stopPropagation();
              initKeyword();
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13.2287L6.08137 19.1473C5.91984 19.3088 5.7168 19.3915 5.47225 19.3952C5.22772 19.399 5.02095 19.3163 4.85193 19.1473C4.6829 18.9783 4.59839 18.7734 4.59839 18.5326C4.59839 18.2918 4.6829 18.0869 4.85193 17.9179L10.7705 11.9993L4.85193 6.08063C4.69039 5.91911 4.60775 5.71607 4.60402 5.47152C4.60026 5.22699 4.6829 5.02021 4.85193 4.8512C5.02095 4.68217 5.22585 4.59766 5.46665 4.59766C5.70745 4.59766 5.91236 4.68217 6.08137 4.8512L12 10.7698L17.9186 4.8512C18.0801 4.68966 18.2832 4.60702 18.5277 4.60329C18.7723 4.59953 18.979 4.68217 19.148 4.8512C19.3171 5.02021 19.4016 5.22512 19.4016 5.46592C19.4016 5.70672 19.3171 5.91162 19.148 6.08063L13.2294 11.9993L19.148 17.9179C19.3096 18.0794 19.3922 18.2824 19.396 18.527C19.3997 18.7715 19.3171 18.9783 19.148 19.1473C18.979 19.3163 18.7741 19.4008 18.5333 19.4008C18.2925 19.4008 18.0876 19.3163 17.9186 19.1473L12 13.2287Z"
                fill="#a4a4a4"
              />
            </svg>
          </button>
        )}
        {isOpen ? (
          <button
            type="button"
            className="animate-bounceRight hover:translate-x-2"
          >
            <Image
              src="/arrow.svg"
              alt="인풋 닫기 버튼"
              width={15}
              height={15}
              className="-rotate-90"
            />
          </button>
        ) : (
          <button type="button">
            <Image
              src="/images/search.svg"
              alt="검색창 열기 버튼"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </label>
  );
};

export default SearchInput;
