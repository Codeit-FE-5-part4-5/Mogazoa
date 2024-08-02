import Image from 'next/image';
import { forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Category } from '@/types/category/category';
import { CATEGORY_LIST } from '@/constants/category';

interface CategoryButtonProps {
  category: Category;
  currentCategory: string;
  onClick: (value: string | Record<string, string | string[]>) => void;
}

const CategoryButton = forwardRef<HTMLLIElement, CategoryButtonProps>(
  ({ category, currentCategory, onClick }, ref) => {
    return (
      <li
        ref={ref}
        className="group w-fit flex-shrink-0 px-[20px] outline-none"
      >
        <button
          type="button"
          onClick={() => {
            if (category.name === currentCategory) {
              return onClick({});
            }
            return onClick({
              category: category.name,
              categoryId: String(category.id),
            });
          }}
          className={`border-b-[2px] text-[16px] text-var-gray1 transition-all duration-300 group-hover:text-var-gray2 ${category.name === currentCategory ? 'border-var-gray2 text-var-gray2' : 'border-[#1C1C22]'} pb-[10px] hover:border-var-gray1`}
        >
          {category.name}
        </button>
      </li>
    );
  },
);

interface SlideMenuBarProps {
  currentCategory: string;
  onClick: (value: string | Record<string, string | string[]>) => void;
}

const SlideMenuBar = ({ currentCategory, onClick }: SlideMenuBarProps) => {
  const [leftRef, isMoreLeft] = useInView();
  const [rightRef, isMoreRight] = useInView();

  return (
    <ul className="flex overflow-x-auto no-scrollbar">
      {!isMoreLeft && (
        <button
          type="button"
          className="absolute left-[10px] top-[118px] animate-bounceRight"
        >
          <Image
            src="/arrow.svg"
            alt="인풋 닫기 버튼"
            width={10}
            height={10}
            className="rotate-90"
          />
        </button>
      )}
      {CATEGORY_LIST?.map((category, idx) => {
        if (CATEGORY_LIST.length - 1 === idx) {
          return (
            <CategoryButton
              key={category.id}
              category={category}
              currentCategory={currentCategory}
              onClick={onClick}
              ref={rightRef}
            />
          );
        }
        if (idx === 0) {
          return (
            <CategoryButton
              key={category.id}
              category={category}
              currentCategory={currentCategory}
              onClick={onClick}
              ref={leftRef}
            />
          );
        }
        return (
          <CategoryButton
            key={category.id}
            category={category}
            currentCategory={currentCategory}
            onClick={onClick}
          />
        );
      })}
      {!isMoreRight && (
        <button
          type="button"
          className="absolute right-[10px] top-[118px] animate-bounceRight"
        >
          <Image
            src="/arrow.svg"
            alt="인풋 닫기 버튼"
            width={10}
            height={10}
            className="-rotate-90"
          />
        </button>
      )}
    </ul>
  );
};

export default SlideMenuBar;
