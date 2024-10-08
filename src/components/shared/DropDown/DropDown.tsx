import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import useAnimation from '@/hooks/useAnimation';
import useClickOutside from '@/hooks/useClickOutside';

interface ItemListProps extends DropDownProps {
  animationTrigger: boolean;
  handleAnimationEnd: () => void;
}

interface DropDownProps {
  itemList: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (arg: any) => void;
  isOrder?: boolean;
}

const DropDown = ({ itemList, onClick, isOrder = false }: DropDownProps) => {
  const [selectMenu, setSelectMenu] = useState(itemList[0]);
  const [showMenuList, setShowMenuList] = useState(false);
  const [shouldRender, animationTrigger, handleAnimationEnd] =
    useAnimation(showMenuList);
  const ref = useClickOutside<HTMLDivElement>(setShowMenuList);

  const handleClickEvent = useCallback(
    (item: string) => {
      onClick(item);
      setSelectMenu(item);
      setShowMenuList(false);
    },
    [onClick],
  );

  useEffect(() => {
    if (!isOrder) {
      setSelectMenu('카테고리 선택');
    }
  }, [isOrder]);

  return (
    <div
      ref={ref}
      onClick={() => setShowMenuList((prev) => !prev)}
      className={cn(
        'group relative w-full cursor-pointer select-none items-center rounded-[6px] border bg-var-black2 px-[18px] py-[17px] text-[14px] transition-all duration-300 hover:border-gradient-custom xl:text-[14px]',
        isOrder ? 'border-var-black2 py-[6px]' : 'md:py-[18px] xl:py-[22px]',
        showMenuList ? 'border-gradient-custom' : 'border-var-black3',
      )}
    >
      <div className="flex items-center justify-between py-[2px]">
        <input
          value={selectMenu}
          readOnly
          className={cn(
            'w-full cursor-pointer outline-none group-hover:bg-[#17171c] group-hover:text-var-gray2',
            isOrder && 'bg-[#1c1c22]',
            showMenuList
              ? 'bg-var-black1 text-var-gray2'
              : 'bg-var-black2 text-var-gray1',
          )}
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
        <DropDown.ItemList
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

DropDown.ItemList = ({
  itemList,
  onClick,
  isOrder,
  animationTrigger,
  handleAnimationEnd,
}: ItemListProps) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      onAnimationEnd={handleAnimationEnd}
      className={cn(
        'absolute left-0 z-10 flex w-full flex-col gap-[4px] rounded-[6px] border border-var-black3 bg-var-black2 p-[10px] shadow-lg',
        isOrder ? 'top-[44px]' : 'top-[76px]',
        animationTrigger ? 'animate-slideDown' : 'animate-slideUp',
      )}
    >
      {itemList.map((item) => (
        <div
          key={item}
          onClick={() => onClick(item)}
          className="select-none rounded-[6px] bg-var-black2 px-[20px] py-[6px] text-var-gray1 hover:bg-var-black3 hover:text-var-gray2"
        >
          {item}
        </div>
      ))}
    </div>
  );
};
export default DropDown;
