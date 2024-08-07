import { cn } from '@/lib/cn';
import { CATEGORY_LIST } from '@/constants/category';
import { Category } from '@/types/category/category';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

interface DesktopCategoryMenuProps {
  isVisible?: boolean;
  currentCategory: string;
  onCategoryClick: (value: string | Record<string, string | string[]>) => void;
}

type TotalCategoryButtonProps = Omit<
  DesktopCategoryMenuProps,
  'currentCategory'
> & {
  isHover: boolean;
  setHover: Dispatch<SetStateAction<boolean>>;
};

type CategoryButtonProps = Omit<DesktopCategoryMenuProps, 'isVisible'> & {
  item: Category;
};

const DesktopCategoryMenu = ({
  isVisible = false,
  currentCategory,
  onCategoryClick,
}: DesktopCategoryMenuProps) => {
  const [isHover, setHover] = useState(false);
  return (
    <div
      className={cn(
        'mx-[20px] hidden h-full w-[160px] flex-shrink-0 flex-col bg-[#1C1C22] text-white md:sticky md:top-[100px] md:flex',
        isVisible ? 'my-[20px]' : 'mt-[45px]',
      )}
    >
      <DesktopCategoryMenu.TotalCategoryButton
        isVisible={isVisible}
        onCategoryClick={onCategoryClick}
        isHover={isHover}
        setHover={setHover}
      />
      <ul className="flex flex-col gap-[4px]">
        {CATEGORY_LIST.map((item: Category) => (
          <DesktopCategoryMenu.CategoryButton
            item={item}
            key={item.id}
            currentCategory={currentCategory}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </ul>
    </div>
  );
};

DesktopCategoryMenu.TotalCategoryButton = ({
  isVisible,
  onCategoryClick,
  isHover,
  setHover,
}: TotalCategoryButtonProps) => {
  return (
    <div className="flex gap-[12px]">
      <button
        type="button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onCategoryClick({})}
        className={cn(
          'ml-[20px] flex pb-[15px] text-[16px] font-bold leading-normal text-white',
          isVisible && 'hidden',
        )}
      >
        전체 카테고리
      </button>
      {isHover && (
        <div className="relative top-[6px] size-[12px] animate-bounceRight">
          <Image
            src="arrow.svg"
            alt="화살표 버튼"
            fill
            className="-rotate-90"
          />
        </div>
      )}
    </div>
  );
};

DesktopCategoryMenu.CategoryButton = ({
  item,
  currentCategory,
  onCategoryClick,
}: CategoryButtonProps) => {
  return (
    <button
      type="button"
      key={item.id}
      className={cn(
        'flex h-[45px] cursor-pointer items-center rounded-2xl px-[20px] py-[15px] text-sm font-medium leading-normal transition-colors duration-300 hover:bg-[#252530]',
        currentCategory === item.name
          ? 'border-[#353542] bg-[#252530] text-var-white'
          : 'bg-[#1C1C22] text-[#6E6E82]',
      )}
      onClick={() => {
        if (item.name === currentCategory) {
          onCategoryClick({});
        } else {
          onCategoryClick({
            category: item.name,
            categoryId: String(item.id),
          });
        }
      }}
    >
      {item.name}
    </button>
  );
};

export default DesktopCategoryMenu;
