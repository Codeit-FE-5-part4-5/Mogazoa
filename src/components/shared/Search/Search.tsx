import Image from 'next/image';
import useSearch from '@/store/use-search-store';

const Search = () => {
  const { onOpen } = useSearch();
  return (
    <button type="button" onClick={() => onOpen()} className="group relative">
      <div className="flex h-[42px] flex-col items-start justify-center gap-[10px] rounded-[28px] border border-var-black3 bg-[#252530] p-[16px_20px] text-var-gray2 outline-none transition-all duration-300 group-hover:bg-[#17171C] group-hover:border-gradient-custom" />
      <div className="absolute right-[10px] top-[50%] flex -translate-y-1/2 cursor-pointer items-center gap-[15px]">
        <Image
          src="/images/search.svg"
          alt="검색창 열기 버튼"
          width={24}
          height={24}
        />
      </div>
    </button>
  );
};

export default Search;
