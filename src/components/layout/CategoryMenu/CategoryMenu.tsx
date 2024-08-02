import { cn } from '@/lib/utils';
import { CATEGORY_LIST } from '@/constants/category';
import useIsMobile from '@/hooks/useIsMobile';
import { Category } from '@/types/category/category';
import SlideMenuBar from '../SlideMenuBar/SlideMenuBar';

interface SlideMenuProps {
  isVisible?: boolean;
  currentCategoryName: string;
  handleClickCategory: (
    value: string | Record<string, string | string[]>,
  ) => void;
}

const CategoryMenu = ({
  isVisible = false,
  currentCategoryName,
  handleClickCategory,
}: SlideMenuProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex border-b border-var-black3">
        <SlideMenuBar
          currentCategory={currentCategoryName}
          onClick={handleClickCategory}
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'mx-[20px] hidden w-[160px] flex-shrink-0 flex-col bg-[#1C1C22] text-white md:flex',
        isVisible ? 'my-[20px]' : 'mt-[45px]',
      )}
    >
      <div
        className={cn(
          'ml-[20px] pb-[15px] text-sm font-normal leading-normal text-white',
          isVisible && 'hidden',
        )}
      >
        전체 카테고리
      </div>
      <ul className="flex flex-col gap-[4px]">
        {CATEGORY_LIST.map((item: Category) => (
          <button
            type="button"
            key={item.id}
            className={cn(
              'flex h-[45px] cursor-pointer items-center rounded-2xl px-[20px] py-[15px] text-sm font-medium leading-normal transition-colors duration-300 hover:text-var-gray2',
              currentCategoryName === item.name
                ? 'border-[#353542] bg-[#252530]'
                : 'bg-[#1C1C22] text-[#6E6E82]',
            )}
            onClick={() => {
              if (item.name === currentCategoryName) {
                handleClickCategory({});
              } else {
                handleClickCategory({
                  category: item.name,
                  categoryId: String(item.id),
                });
              }
            }}
          >
            {item.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
