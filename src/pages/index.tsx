import { useState } from 'react';
import CategoryMenu from '@/shared/components/CategoryMenu/CategoryMenu';
import SlideMenuBar from '@/shared/components/SlideMenuBar/SlideMenuBar';
import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import ProductSection from '@/shared/components/ProductSection/ProductSection';
import useGetFollowersRanking from '@/shared/models/user/follow/followers/useGetFollowersRanking';
import useGetCategory from '@/shared/models/category/useGetCategory';
import sortConverter from '@/shared/utils/sortConverter';
import castArray from '@/shared/utils/castArray';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import useSearchRouter from '@/shared/hooks/useSearchRouter';
import { ORDER_VARIANTS } from '@/shared/constants/products';
import useGetInfiniteProducts from '@/shared/models/product/useGetInfiniteProducts';
import RankingList from '@/shared/components/RankingList/RankingList';
import useGetSortedProducts from '@/shared/models/product/useGetSortedProducts';
import SortedProductList from '@/shared/components/SortedProductList/SortedProductList';
import useIntersect from '@/shared/hooks/useIntersect';

const Home = () => {
  const { currentQuery, handleRouterPush } = useChangeRouter();
  const { searchQuery } = useSearchRouter();
  const [currentSortOrder, setCurrentSortOrder] = useState(
    sortConverter(ORDER_VARIANTS[0]),
  );
  // 카테고리 상품
  const { data: categories } = useGetCategory();
  const {
    fetchNextPage,
    hasNextPage,
    data: products,
    isLoading,
  } = useGetInfiniteProducts({
    categoryId: Number(currentQuery.categoryId),
    order: currentSortOrder,
    keyword: searchQuery,
  });
  const ref = useIntersect<HTMLDivElement>(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });
  const productsList = products?.pages.flatMap((page) => page.list) || [];
  // TOP 6 정렬 상품
  const { data: sortedProducts, isPending: isLoadingSortedProducts } =
    useGetSortedProducts();
  // 리뷰어 랭킹
  const { data: rankingData } = useGetFollowersRanking();
  const sliceRankingData = rankingData?.slice(0, 5);

  return (
    <MogazoaLayout>
      <div className="flex border-b border-var-black3 md:hidden">
        <SlideMenuBar
          categories={categories}
          currentCategory={castArray(currentQuery.category)}
          onClick={handleRouterPush}
        />
      </div>
      <div className="flex justify-center">
        <div className="hidden md:flex">
          <CategoryMenu
            categories={categories}
            currentCategoryName={castArray(currentQuery.category)}
            handleClickCategory={handleRouterPush}
          />
        </div>
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <RankingList rankingData={sliceRankingData} />
          <div className="flex-1">
            {currentQuery.category || searchQuery ? (
              <>
                <ProductSection
                  isLoading={isLoading}
                  products={productsList}
                  searchQuery={searchQuery}
                  currentCategoryName={castArray(currentQuery.category)}
                  changeSortOrder={(order) =>
                    setCurrentSortOrder(sortConverter(order))
                  }
                />
                {productsList && <div className="h-[50px] w-full" ref={ref} />}
              </>
            ) : (
              <SortedProductList
                sortedProducts={sortedProducts}
                isPending={isLoadingSortedProducts}
              />
            )}
          </div>
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default Home;
