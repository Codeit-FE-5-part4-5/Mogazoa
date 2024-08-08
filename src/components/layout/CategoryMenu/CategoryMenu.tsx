import { useIsMobile } from '@/hooks';
import MobileCategoryMenu from './MobileCategoryMenu';
import DesktopCategoryMenu from './DesktopCategoryMenu';

interface CategoryMenuProps {
  isVisible?: boolean;
  currentCategory: string;
  onCategoryClick: (value: string | Record<string, string | string[]>) => void;
}

const CategoryMenu = ({
  currentCategory,
  onCategoryClick,
  isVisible = false,
}: CategoryMenuProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex border-b border-var-black3 md:border-b-0 md:border-none">
        <MobileCategoryMenu
          currentCategory={currentCategory}
          onCategoryClick={onCategoryClick}
        />
      </div>
    );
  }
  return (
    <DesktopCategoryMenu
      currentCategory={currentCategory}
      onCategoryClick={onCategoryClick}
      isVisible={isVisible}
    />
  );
};

export default CategoryMenu;
