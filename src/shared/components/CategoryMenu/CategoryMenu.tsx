import { Category } from '@/shared/types/category/category';

interface SlideMenu {
  isVisible?: boolean;
  categories: Category[];
  currentCategoryName: string;
  handleClickCategory: (
    value: string | Record<string, string | number>,
  ) => void;
}

export const CategoryMenu: React.FC<SlideMenu> = ({
  isVisible = false,
  categories = [],
  currentCategoryName,
  handleClickCategory,
}) => {
  return (
    <div
      className={` ${isVisible ? 'my-[20px]' : 'mt-[45px]'} mx-[20px] w-[160px] flex-shrink-0 flex-col bg-[#1C1C22] text-white`}
    >
      <div
        className={`${isVisible && 'hidden'} ml-[20px] pb-[15px] text-sm font-normal leading-normal text-white`}
      >
        전체 카테고리
      </div>
      <ul className="flex flex-col gap-[4px]">
        {categories.map((item: Category, index: number) => (
          <li
            key={index}
            className={`flex h-[45px] cursor-pointer items-center rounded-2xl px-[20px] py-[15px] text-sm font-medium leading-normal transition-colors duration-300 hover:text-var-gray2 ${
              currentCategoryName === item.name
                ? 'border-[#353542] bg-[#252530]'
                : 'bg-[#1C1C22] text-[#6E6E82]'
            }`}
            onClick={() => {
              if (item.name === currentCategoryName) {
                return handleClickCategory({});
              }
              handleClickCategory({ category: item.name, categoryId: item.id });
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
