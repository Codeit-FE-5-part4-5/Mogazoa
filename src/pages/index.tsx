import { useState } from 'react';
import { RankingList } from '@/shared/components/RankingList/RankingList';
import { CategoryMenu } from '@/shared/components/CategoryMenu/CategoryMenu';
import SlideMenuBar from '@/shared/components/SlideMenuBar/SlideMenuBar';
import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import { ORDER_VARIANTS } from '@/shared/constants/products';
import useGetCategory from '@/shared/models/category/useGetCategory';
import useGetProducts from '@/shared/models/product/useGetProducts';
import sortConverter from '@/shared/utils/sortConverter';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import SortedProductList from '@/shared/components/SortedProductList/SortedProductList';
import ProductList from '@/shared/components/ProductList/ProductList';

export default function Home() {
  const {
    currentCategoryName,
    currentCategoryId,
    handleClickCategory,
    searchQuery,
  } = useChangeRouter();
  const [currentSortOrder, setCurrentSortOrder] = useState(
    sortConverter(ORDER_VARIANTS[0]),
  );
  const { data: categories } = useGetCategory();
  const { data: products } = useGetProducts({
    categoryId: Number(currentCategoryId),
    order: currentSortOrder,
    keyword: searchQuery,
  });

  const changeSortOrder = (order: string) => {
    setCurrentSortOrder(sortConverter(order));
  };

  return (
    <MogazoaLayout>
      <div className="flex border-b border-var-black3 md:hidden">
        <SlideMenuBar
          categories={categories}
          currentCategory={currentCategoryName}
          onClick={handleClickCategory}
        />
      </div>
      <main className="flex justify-center">
        <div className="hidden md:flex">
          <CategoryMenu
            categories={categories}
            currentCategoryName={currentCategoryName}
            handleClickCategory={handleClickCategory}
          />
        </div>
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <RankingList />
          <div className="flex-1">
            {currentCategoryName ? (
              <ProductList
                products={products}
                searchQuery={searchQuery}
                currentCategoryName={currentCategoryName}
                changeSortOrder={changeSortOrder}
              />
            ) : (
              <>
                <SortedProductList sortBy="reviewCount" />
                <SortedProductList sortBy="rating" />
                <SortedProductList sortBy="recent" />
              </>
            )}
          </div>
        </div>
      </main>
    </MogazoaLayout>
  );
}
