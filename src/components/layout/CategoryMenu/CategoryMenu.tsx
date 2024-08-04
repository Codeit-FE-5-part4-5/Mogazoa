import { useIsMobile } from '@/hooks';
import MobileCategoryMenu from './MobileCategoryMenu';
import DesktopCategoryMenu from './DesktopCategoryMenu';

interface CategoryMenuProps {
  isVisible?: boolean;
  currentCategory: string;
  handleClickCategory: (
    value: string | Record<string, string | string[]>,
  ) => void;
}

const CategoryMenu = ({
  currentCategory,
  handleClickCategory,
  isVisible = false,
}: CategoryMenuProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex border-b border-var-black3 md:border-b-0 md:border-none">
        <MobileCategoryMenu
          currentCategory={currentCategory}
          onClick={handleClickCategory}
        />
      </div>
    );
  }
  return (
    <DesktopCategoryMenu
      currentCategory={currentCategory}
      handleClickCategory={handleClickCategory}
      isVisible={isVisible}
    />
  );
};

export default CategoryMenu;
