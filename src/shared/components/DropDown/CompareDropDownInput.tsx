import React, {
  ChangeEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import CompareChip from '../Chip/CompareChip';
import { Product } from '@/shared/types/product/product';
import { BEDGE_COLORS } from '@/shared/constants/products';
import { useInView } from 'react-intersection-observer';

interface ItemListProps {
  itemList: Product[];
  onClick: (arg: string) => void;
  fetchNextPage: () => void;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
}

const ItemList = ({
  itemList,
  onClick,
  fetchNextPage,
  isFetching,
  hasNextPage,
}: ItemListProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  return (
    <div
      className={`absolute left-0 top-[60px] z-10 flex max-h-[200px] w-full animate-slideDown flex-col gap-[5px] overflow-scroll rounded-[6px] border border-var-black3 bg-var-black2 p-[10px] shadow-lg`}
    >
      {itemList.map((item) => (
        <div
          key={item.id}
          onClick={() => onClick(item.name)}
          className="flex flex-row items-center justify-between rounded-[6px] bg-var-black2 px-[20px] py-[6px] text-var-gray1 hover:bg-var-black3 hover:text-var-gray2"
        >
          {item.name}
        </div>
      ))}
      <div ref={ref}></div>
      {isFetching && <div>Loading...</div>}
    </div>
  );
};

interface CompareDropDownProps {
  itemList: any[]; // 페이지 데이터의 타입을 설정합니다.
  onClick: (arg: string) => void;
  Bedge: string;
  setBedge: React.Dispatch<SetStateAction<string>>;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  fetchNextPage: () => void;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  setValue: React.Dispatch<SetStateAction<string>>;
}

export default function CompareDropDownInput({
  itemList,
  Bedge,
  setBedge,
  value,
  onChange,
  fetchNextPage,
  isFetching,
  hasNextPage,
  setValue,
}: CompareDropDownProps) {
  const handleClickEvent = (item: string) => {
    setBedge(item);
    setValue('');
  };

  const onClickDelete = () => {
    setBedge('');
    setValue('');
  };

  // 다중 배열 맵핑을 위해 flatMap 사용
  const flatItemList = itemList?.flatMap((page) => page.list) || [];
  const isItem = value.length > 1 && flatItemList.length > 0;

  // 드롭다운
  const [isOpen, setIsOpen] = useState(false);

  const dropDownElement = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownElement.current &&
      !dropDownElement.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isItem) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [value, isFetching]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropDownElement}
      className="relative w-full cursor-pointer items-center rounded-[6px] border border-var-black3 bg-var-black2 px-[20px] py-[17px] text-[14px] focus:border-gradient-custom xl:text-[16px]"
    >
      <div className="relative flex size-full items-center justify-between py-[2px]">
        <label htmlFor="text">
          <div>
            {Bedge && (
              <CompareChip
                name={Bedge}
                orderPosition={BEDGE_COLORS.green}
                onClick={onClickDelete}
              />
            )}
          </div>
          {!Bedge && (
            <input
              id="text"
              name="text"
              value={value}
              className="w-full cursor-pointer bg-var-black2 text-var-gray1 outline-none"
              onChange={onChange}
            />
          )}
        </label>
      </div>
      {isOpen && (
        <ItemList
          itemList={flatItemList}
          onClick={handleClickEvent}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
        />
      )}
    </div>
  );
}
