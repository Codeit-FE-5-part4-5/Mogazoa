import useAnimation from '@/shared/hooks/useAnimation';
import useClickOutside from '@/shared/hooks/useClickOutside';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface ItemListProps {
  itemList: string[];
  onClick: (arg: any) => void;
  isOrder?: boolean;
  animationTrigger: boolean;
  handleAnimationEnd: () => void;
}

const ItemList = ({
  itemList,
  onClick,
  isOrder,
  animationTrigger,
  handleAnimationEnd,
}: ItemListProps) => {
  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`absolute left-0 z-10 ${isOrder ? 'top-[44px]' : 'top-[76px]'} flex w-full ${animationTrigger ? 'animate-slideDown' : 'animate-slideUp'} flex-col gap-[5px] rounded-[6px] border border-var-black3 bg-var-black2 p-[10px] shadow-lg`}
    >
      {itemList.map((item) => (
        <div
          key={item}
          onClick={() => onClick(item)}
          className={`select-none rounded-[6px] bg-var-black2 px-[20px] py-[6px] text-var-gray1 hover:bg-var-black3 hover:text-var-gray2`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

interface DropDownProps {
  itemList: string[];
  onClick: (arg: any) => void;
  isOrder?: boolean;
}

const DropDown = ({ itemList, onClick, isOrder = false }: DropDownProps) => {
  const [selectMenu, setSelectMenu] = useState(itemList[0]);
  const [showMenuList, setShowMenuList] = useState(false);
  const dropDownElement = useRef<HTMLDivElement>(null);
  const [shouldRender, animationTrigger, handleAnimationEnd] =
    useAnimation(showMenuList);
  useClickOutside(dropDownElement, setShowMenuList);

  const handleClickEvent = (item: string) => {
    onClick(item);
    setSelectMenu(item);
  };

  return (
    <div
      ref={dropDownElement}
      onClick={() => setShowMenuList((prev) => !prev)}
      className={`${showMenuList ? 'border-gradient-custom' : 'border-var-black3'} ${isOrder && 'border-var-black2 py-[6px]'} relative w-full cursor-pointer items-center rounded-[6px] border bg-var-black2 px-[20px] py-[17px] text-[14px] hover:border-gradient-custom md:${!isOrder && 'py-[19px]'} select-none transition-all duration-300 xl:${!isOrder && 'py-[22px]'} group xl:text-[16px]`}
    >
      <div className="flex items-center justify-between py-[2px]">
        <input
          value={selectMenu}
          readOnly
          className={`cursor-pointer ${showMenuList ? 'bg-var-black1 text-var-gray2' : 'bg-var-black2 text-var-gray1'} ${isOrder && 'bg-[#1c1c22]'} w-full outline-none group-hover:bg-[#17171C]`}
        />
        <Image
          src="/arrow.svg"
          alt="드롭다운 화살표"
          width={8}
          height={4}
          className={showMenuList ? 'rotate-180' : ''}
        />
      </div>
      {shouldRender && (
        <ItemList
          itemList={itemList}
          onClick={handleClickEvent}
          isOrder={isOrder}
          animationTrigger={animationTrigger}
          handleAnimationEnd={handleAnimationEnd}
        />
      )}
    </div>
  );
};

export default DropDown;
