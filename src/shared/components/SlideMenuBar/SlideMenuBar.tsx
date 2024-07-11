import { Category } from '@/shared/types/category/category';

interface SlideMenuBarProps {
  categories: Category[];
  currentCategory: string;
  onClick: (value: { name: string; id: number }) => void;
}

interface CategoryButtonProps {
  category: Category;
  currentCategory: string;
  onClick: (value: { name: string; id: number }) => void;
}

const CategoryButton = ({
  category,
  currentCategory,
  onClick,
}: CategoryButtonProps) => {
  return (
    <li className="group w-fit flex-shrink-0 translate-x-[20px]">
      <button
        onClick={() => onClick(category)}
        className={`border-b-[2px] text-[16px] text-var-gray1 transition-all duration-300 group-hover:text-var-gray2 ${category.name === currentCategory ? 'border-var-gray2 text-var-gray2' : 'border-[#1C1C22]'} pb-[10px] hover:border-var-gray1`}
      >
        {category.name}
      </button>
    </li>
  );
};

const SlideMenuBar = ({
  categories,
  currentCategory,
  onClick,
}: SlideMenuBarProps) => {
  return (
    <ul className="flex gap-[40px] overflow-x-auto no-scrollbar">
      {categories?.map((category, idx) => {
        if (categories.length - 1 === idx) {
          return (
            <>
              <CategoryButton
                category={category}
                currentCategory={currentCategory}
                onClick={onClick}
              />
              <div className="w-[20px]"></div>
            </>
          );
        } else {
          return (
            <CategoryButton
              category={category}
              currentCategory={currentCategory}
              onClick={onClick}
            />
          );
        }
      })}
    </ul>
  );
};

export default SlideMenuBar;
