import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ItemListProps {
  itemList: string[];
  onClick: (arg: string) => void;
  isOrder?: boolean;
}

const ItemList = ({ itemList, onClick, isOrder }: ItemListProps) => {
  return (
    <div
      className={`absolute left-0 z-10 ${isOrder ? 'top-[44px]' : 'top-[66px]'} flex w-full flex-col gap-[5px] rounded-[6px] border border-var-black3 bg-var-black2 p-[10px] shadow-lg`}
    >
      {itemList.map((item) => (
        <div
          key={item}
          onClick={() => onClick(item)}
          className={`rounded-[6px] bg-var-black2 px-[20px] py-[6px] text-var-gray1 hover:bg-var-black3 hover:text-var-gray2`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

interface DropDownProps {
  itemList: string[];
  onClick: (arg: string) => void;
  isOrder?: boolean;
}

export default function DropDown({
  itemList,
  onClick,
  isOrder = false,
}: DropDownProps) {
  const [selectMenu, setSelectMenu] = useState(itemList[0]);
  const [showMenuList, setShowMenuList] = useState(false);
  const dropDownElement = useRef<HTMLDivElement>(null);

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
      className={`${!isOrder && showMenuList ? 'border-gradient-custom' : 'border-var-gray1'} ${isOrder && 'border-none py-[6px]'} relative w-full cursor-pointer items-center rounded-[6px] border bg-var-black2 px-[20px] py-[17px] text-[14px] md:py-[19px] xl:py-[22px] xl:text-[16px]`}
      // style={{ backgroundColor: 'transparent' }}
    >
      <div className="flex size-full items-center justify-between py-[2px]">
        <input
          value={selectMenu}
          readOnly
          className={`cursor-pointer ${!isOrder && showMenuList ? 'bg-var-black1 text-var-gray2' : 'bg-var-black2 text-var-gray1'} ${isOrder && 'bg-[#1c1c22]'} outline-none`}
        />
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
