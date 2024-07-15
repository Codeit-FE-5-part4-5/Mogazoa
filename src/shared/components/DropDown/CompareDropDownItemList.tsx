import { CompareItemListProps } from '@/shared/types/product/product';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const CompareDropDownItemList = ({
  itemList,
  onClick,
  fetchNextPage,
  isFetching,
  hasNextPage,
}: CompareItemListProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  return (
    <div
      className={`absolute left-0 top-[60px] z-10 flex max-h-[200px] w-full animate-slideDown flex-col gap-[5px] overflow-scroll rounded-[6px] border border-var-black3 bg-var-black2 p-[10px] shadow-lg xl:top-[75px]`}
    >
      {itemList.map((item) => (
        <div
          key={item.id}
          onClick={() => onClick(item.name, item.id)}
          className="flex flex-row items-center justify-between rounded-[6px] bg-var-black2 px-[20px] py-[6px] text-var-gray1 hover:bg-var-black3 hover:text-var-gray2"
        >
          {item.name}
        </div>
      ))}
      <div ref={ref}></div>
      {isFetching && <div className="px-[20px] py-[6px]">Loading...</div>}
    </div>
  );
};

export default CompareDropDownItemList;
