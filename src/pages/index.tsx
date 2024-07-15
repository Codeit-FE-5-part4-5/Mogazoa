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
import useSearchRouter from '@/shared/hooks/useSearchRouter';
import Spinner from '@/shared/components/Spinner/Spinner';
import { validateArray } from '@/shared/utils/validateArray';

export default function Home() {
  const { currentQuery, handleRouterPush } = useChangeRouter();
  const { searchQuery } = useSearchRouter();
  const [currentSortOrder, setCurrentSortOrder] = useState(
    sortConverter(ORDER_VARIANTS[0]),
  );
  const { data: categories } = useGetCategory();
  const { data: products, isLoading } = useGetProducts({
    categoryId: Number(currentQuery.categoryId),
    order: currentSortOrder,
    keyword: searchQuery,
  });

  return (
    <MogazoaLayout>
      <div className="flex border-b border-var-black3 md:hidden">
        <SlideMenuBar
          categories={categories}
          currentCategory={validateArray(currentQuery.category)}
          onClick={handleRouterPush}
        />
      </div>
      <main className="flex justify-center">
        <div className="hidden md:flex">
          <CategoryMenu
            categories={categories}
            currentCategoryName={validateArray(currentQuery.category)}
            handleClickCategory={handleRouterPush}
          />
        </div>
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <RankingList />
          <div className="flex-1">
            {currentQuery.category ? (
              <ProductList
                products={products}
                searchQuery={searchQuery}
                currentCategoryName={validateArray(currentQuery.category)}
                changeSortOrder={(order) =>
                  setCurrentSortOrder(sortConverter(order))
                }
              />
            ) : (
              <>
                <SortedProductList sortBy="reviewCount" />
                <SortedProductList sortBy="rating" />
                <SortedProductList sortBy="recent" />
              </>
            )}
            <Spinner isLoading={isLoading} />
          </div>
        </div>
      </main>
    </MogazoaLayout>
  );
}
