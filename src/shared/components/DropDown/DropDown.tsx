import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ItemListProps {
  itemList: string[];
  onClick: (arg: string) => void;
}

const ItemList = ({ itemList, onClick }: ItemListProps) => {
  return (
    <div
      className={`absolute left-0 top-[75px] flex w-full flex-col gap-[5px] rounded-[6px] border border-var-black3 bg-var-black2 p-[10px] shadow-lg`}
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
}

export default function DropDown({ itemList, onClick }: DropDownProps) {
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
      className={`${showMenuList ? 'border-gradient-custom' : 'border-var-gray1'} relative w-full cursor-pointer items-center rounded-[0.6rem] border bg-var-black2 px-[20px] py-[17px] text-[14px] md:py-[19px] xl:py-[22px] xl:text-[16px]`}
    >
      <div className="flex size-full items-center justify-between py-[2px]">
        <input
          value={selectMenu}
          readOnly
          className={`cursor-pointer ${showMenuList ? 'bg-var-black1 text-var-gray2' : 'bg-var-black2 text-var-gray1'} outline-none`}
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
        <ItemList itemList={itemList} onClick={handleClickEvent} />
      )}
    </div>
  );
}
