import { useRouter } from 'next/router';
import { useState } from 'react';

interface SlideMenu {
  categories: Category[];
}

export const SlideMenu: React.FC<SlideMenu> = ({ categories = [] }) => {
  const [activeItem, setActiveItem] = useState({ name: '', id: 0 });
  const router = useRouter();
  const currentPath = router.pathname;
  const handleItemClick = (category: { name: string; id: number }) => {
    setActiveItem(category);
    router.push({
      pathname: currentPath,
      query: { name: category.name, id: category.id },
    });
  };

  return (
    <div className="mt-[45px] hidden w-[160px] flex-shrink-0 flex-col bg-[#1C1C22] text-white md:flex">
      <div className="ml-[20px] pb-[15px] text-sm font-normal leading-normal text-white">
        카테고리
      </div>
      <ul className="flex flex-col gap-[4px]">
        {categories.map((item: Category, index: number) => (
          <li
            key={index}
            className={`flex h-[45px] cursor-pointer items-center rounded-2xl px-[20px] py-[15px] text-sm font-medium leading-normal ${
              activeItem.name === item.name
                ? 'border-[1px] border-[#353542] bg-[#252530]'
                : 'bg-[#1C1C22] text-[#6E6E82]'
            }`}
            onClick={() => handleItemClick({ name: item.name, id: item.id })}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
