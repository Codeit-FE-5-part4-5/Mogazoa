import React, {
  ChangeEventHandler,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import CompareChip from '../Chip/CompareChip';
import { Product } from '@/shared/types/product/product';

interface ItemListProps {
  itemList: Product[];
  onClick: (arg: string) => void;
  isOrder?: boolean;
}

const ItemList = ({ itemList, onClick, isOrder }: ItemListProps) => {
  return (
    <div
      className={`absolute left-0 z-10 ${isOrder ? 'top-[44px]' : 'top-[76px]'} flex w-full animate-slideDown flex-col gap-[5px] rounded-[6px] border border-var-black3 bg-var-black2 p-[10px] shadow-lg`}
    >
      {itemList?.map((item) => (
        <div
          key={item?.id}
          onClick={() => onClick(item?.name)}
          className={`flex flex-row items-center justify-between rounded-[6px] bg-var-black2 px-[20px] py-[6px] text-var-gray1 hover:bg-var-black3 hover:text-var-gray2`}
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
  isOrder?: boolean;
  Bedge: string;
  setBedge: React.Dispatch<SetStateAction<string>>;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const CompareDropDownInput = ({
  itemList,
  isOrder = false,
  Bedge,
  setBedge,
  value,
  onChange,
}: CompareDropDownProps) => {
  const dropDownElement = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownElement.current &&
      !dropDownElement.current.contains(e.target as Node)
    ) {
    }
  };

  const BedgeColor = {
    green: 0,
    red: 1,
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
      className={`${`border-var-black3 focus:border-gradient-custom`} ${isOrder && 'border-var-black2 py-[6px]'} relative w-full cursor-pointer items-center rounded-[6px] border bg-var-black2 px-[20px] py-[17px] text-[14px] md:${!isOrder && 'py-[19px]'} xl:${!isOrder && 'py-[22px]'} xl:text-[16px]`}
    >
      <div className="relative flex size-full items-center justify-between py-[2px]">
        <label htmlFor="text">
          <div>
            {Bedge && (
              <CompareChip
                name={Bedge}
                orderPosition={BedgeColor.green}
                onClick={onClickDelete}
              />
            )}
          </div>
          {!Bedge && (
            <input
              id="text"
              name="text"
              value={value}
              className={`w-full cursor-pointer bg-var-black2 text-var-gray1 ${isOrder && 'bg-[#1c1c22]'} outline-none`}
              onChange={onChange}
            />
          )}
        </label>
      </div>
      {value.length > 1 && itemList?.length !== 0 && (
        <ItemList
          itemList={itemList}
          onClick={handleClickEvent}
          isOrder={isOrder}
        />
      )}
    </div>
  );
};

export default CompareDropDownInput;
