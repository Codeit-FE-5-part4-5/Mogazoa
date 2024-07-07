import { useState } from 'react';

interface SlideMenu {
  categories: Category[];
}

export const SlideMenu: React.FC<SlideMenu> = ({ categories = [] }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  return (
    <div className="h-full w-[180px] flex-shrink-0 bg-[#1C1C22] text-white md:w-[220px]">
      <div className="pb-[20px] pl-[34px] pt-[45px] text-sm font-normal leading-normal text-white">
        카테고리
      </div>
      <ul className="mx-[10px] inline-flex flex-col items-start gap-[4px]">
        {categories.map((item: Category, index: number) => (
          <li
            key={index}
            className={`flex h-[45px] w-[160px] cursor-pointer items-center gap-[10px] rounded-2xl px-[20px] py-[15px] text-sm font-medium leading-normal md:w-[200px] ${
              activeItem === index
                ? 'border-[1px] border-[#353542] bg-[#252530]'
                : 'bg-[#1C1C22] text-[#6E6E82]'
            }`}
            onClick={() => handleItemClick(index)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
