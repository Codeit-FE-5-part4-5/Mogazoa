import React, {
  ChangeEventHandler,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import CompareChip from '../Chip/CompareChip';
import { Product } from '@/shared/types/product/product';
import { BEDGE_COLORS } from '@/shared/constants/products';

interface ItemListProps {
  itemList: Product[];
  onClick: (arg: string) => void;
  isOrder?: boolean;
}

const ItemList = ({ itemList, onClick, isOrder }: ItemListProps) => {
  return (
    <div
      className={`absolute left-0 z-10 ${isOrder ? 'top-[44px]' : 'top-[76px]'} animate-slideDown border-var-black3 bg-var-black2 flex max-h-[200px] w-full flex-col gap-[5px] overflow-scroll rounded-[6px] border p-[10px] shadow-lg`}
    >
      {itemList?.map((item) => (
        <div
          key={item?.id}
          onClick={() => onClick(item?.name)}
          className={`bg-var-black2 text-var-gray1 hover:bg-var-black3 hover:text-var-gray2 flex flex-row items-center justify-between rounded-[6px] px-[20px] py-[6px]`}
        >
          {item?.name}
        </div>
      ))}
    </div>
  );
};

interface CompareDropDownProps {
  itemList: Product[];
  onClick: (arg: string) => void;
  Bedge: string;
  setBedge: React.Dispatch<SetStateAction<string>>;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function CompareDropDownInput({
  itemList,
  Bedge,
  setBedge,
  value,
  onChange,
}: CompareDropDownProps) {
  const dropDownElement = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownElement.current &&
      !dropDownElement.current.contains(e.target as Node)
    ) {
    }
  };

  const handleClickEvent = (item: string) => {
    setBedge(item);
  };

  const onClickDelete = () => {
    setBedge('');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropDownElement}
      className={`${`focus:border-gradient-custom border-var-black3`} bg-var-black2 relative w-full cursor-pointer items-center rounded-[6px] border px-[20px] py-[17px] text-[14px] xl:text-[16px]`}
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
              className={`bg-var-black2 text-var-gray1 w-full cursor-pointer outline-none`}
              onChange={onChange}
            />
          )}
        </label>
      </div>
      {value.length > 1 && itemList?.length !== 0 && (
        <ItemList itemList={itemList} onClick={handleClickEvent} />
      )}
    </div>
  );
}
