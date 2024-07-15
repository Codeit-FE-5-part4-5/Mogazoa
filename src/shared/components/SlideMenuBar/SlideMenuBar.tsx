import useIntersectionObserver from '@/shared/hooks/useIntersectionObserver';
import { Category } from '@/shared/types/category/category';
import Image from 'next/image';
import { forwardRef } from 'react';

interface CategoryButtonProps {
  category: Category;
  currentCategory: string;
  onClick: (value: string | Record<string, string | number>) => void;
}

const CategoryButton = forwardRef<HTMLLIElement, CategoryButtonProps>(
  ({ category, currentCategory, onClick }, ref) => {
    return (
      <li ref={ref} className="group w-fit flex-shrink-0 px-[20px]">
        <button
          onClick={() => onClick({ name: category.name, id: category.id })}
          className={`border-b-[2px] text-[16px] text-var-gray1 transition-all duration-300 group-hover:text-var-gray2 ${category.name === currentCategory ? 'border-var-gray2 text-var-gray2' : 'border-[#1C1C22]'} pb-[10px] hover:border-var-gray1`}
        >
          {category.name}
        </button>
      </li>
    );
  },
);

interface SlideMenuBarProps {
  categories: Category[];
  currentCategory: string;
  onClick: (value: string | Record<string, string | number>) => void;
}

const SlideMenuBar = ({
  categories,
  currentCategory,
  onClick,
}: SlideMenuBarProps) => {
  const [leftRef, isMoreLeft] = useIntersectionObserver<HTMLLIElement>();
  const [rightRef, isMoreRight] = useIntersectionObserver<HTMLLIElement>();

  return (
    <ul className="flex overflow-x-auto no-scrollbar">
      {!isMoreLeft && (
        <button className="absolute left-[10px] top-[134px] animate-bounceRight">
          <Image
            src="/arrow.svg"
            alt="인풋 닫기 버튼"
            width={10}
            height={10}
            className="rotate-90"
          />
        </button>
      )}
      {categories?.map((category, idx) => {
        if (categories.length - 1 === idx) {
          return (
            <CategoryButton
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
              category={category}
              currentCategory={currentCategory}
              onClick={onClick}
              ref={leftRef}
            />
          );
        }
        return (
          <CategoryButton
            category={category}
            currentCategory={currentCategory}
            onClick={onClick}
          />
        );
      })}
      {!isMoreRight && (
        <button className="absolute right-[10px] top-[134px] animate-bounceRight">
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
