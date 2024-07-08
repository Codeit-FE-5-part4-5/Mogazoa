import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CompareChip from '../Chip/CompareChip';

interface ItemListProps {
  itemList: string[];
  onClick: (arg: string) => void;
  isOrder?: boolean;
}

const ItemList = ({ itemList, onClick, isOrder }: ItemListProps) => {
  return (
    <div
      className={`absolute left-0 z-10 ${isOrder ? 'top-[44px]' : 'top-[76px]'} animate-slideDown border-var-black3 bg-var-black2 flex w-full flex-col gap-[5px] rounded-[6px] border p-[10px] shadow-lg`}
    >
      {itemList.map((item) => (
        <div
          key={item}
          onClick={() => onClick(item)}
          className={`bg-var-black2 text-var-gray1 hover:bg-var-black3 hover:text-var-gray2 flex flex-row items-center justify-between rounded-[6px] px-[20px] py-[6px]`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

interface CompareDropDownProps {
  itemList: string[];
  onClick: (arg: string) => void;
  isOrder?: boolean;
}

export default function CompareDropDown({
  itemList,
  onClick,
  isOrder = false,
}: CompareDropDownProps) {
  const [selectMenu, setSelectMenu] = useState(itemList[0]);
  const [showMenuList, setShowMenuList] = useState(false);
  const dropDownElement = useRef<HTMLDivElement>(null);
  const [isBedge, setIsBedge] = useState('');

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownElement.current &&
      !dropDownElement.current.contains(e.target as Node)
    ) {
      setShowMenuList(false);
    }
  };

  const handleClickEvent = (item: string) => {
    onClick(item);
    setSelectMenu(item);
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
      onClick={() => setShowMenuList((prev) => !prev)}
      className={`${showMenuList ? 'border-gradient-custom' : 'border-var-black3'} ${isOrder && 'border-var-black2 py-[6px]'} bg-var-black2 relative w-full cursor-pointer items-center rounded-[6px] border px-[20px] py-[17px] text-[14px] md:${!isOrder && 'py-[19px]'} xl:${!isOrder && 'py-[22px]'} xl:text-[16px]`}
    >
      <div className="flex size-full items-center justify-between py-[2px]">
        <label htmlFor="text">
          <input
            id="text"
            name="text"
            value={selectMenu}
            readOnly
            className={`w-full cursor-pointer ${showMenuList ? 'bg-var-black1 text-var-gray2' : 'bg-var-black2 text-var-gray1'} ${isOrder && 'bg-[#1c1c22]'} outline-none`}
          />
        </label>
        <Image
          src="/arrow.svg"
          alt="드롭다운 화살표"
          width={8}
          height={4}
          className={showMenuList ? 'rotate-180' : ''}
        />
      </div>
      {showMenuList && (
        <ItemList
          itemList={itemList}
          onClick={handleClickEvent}
          isOrder={isOrder}
        />
      )}
    </div>
  );
}
