import { cn } from '@/lib/cn';
import { CATEGORY_LIST } from '@/constants/category';
import { Category } from '@/types/category/category';

interface DesktopCategoryMenuProps {
  isVisible?: boolean;
  currentCategory: string;
  handleClickCategory: (
    value: string | Record<string, string | string[]>,
  ) => void;
}

const DesktopCategoryMenu = ({
  isVisible = false,
  currentCategory,
  handleClickCategory,
}: DesktopCategoryMenuProps) => {
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
              'flex h-[45px] cursor-pointer items-center rounded-2xl px-[20px] py-[15px] text-sm font-medium leading-normal transition-colors duration-300 hover:bg-[#252530]',
              currentCategory === item.name
                ? 'border-[#353542] bg-[#252530] text-var-white'
                : 'bg-[#1C1C22] text-[#6E6E82]',
            )}
            onClick={() => {
              if (item.name === currentCategory) {
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

export default DesktopCategoryMenu;
