import { useEffect, useState } from 'react';
import CategoryMenu from '@/shared/components/CategoryMenu/CategoryMenu';
import SlideMenuBar from '@/shared/components/SlideMenuBar/SlideMenuBar';
import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import ProductSection from '@/shared/components/ProductSection/ProductSection';
import useGetFollowersRanking from '@/shared/models/user/follow/followers/useGetFollowersRanking';
import useGetCategory from '@/shared/models/category/useGetCategory';
import sortConverter from '@/shared/utils/sortConverter';
import validateArray from '@/shared/utils/validateArray';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import useSearchRouter from '@/shared/hooks/useSearchRouter';
import { ORDER_VARIANTS } from '@/shared/constants/products';
import useGetInfiniteProducts from '@/shared/models/product/useGetInfiniteProducts';
import { useInView } from 'react-intersection-observer';
import RankingList from '@/shared/components/RankingList/RankingList';
import useGetSortedProducts from '@/shared/models/product/useGetSortedProducts';
import SortedProductList from '@/shared/components/SortedProductList/SortedProductList';

const Home = () => {
  const { currentQuery, handleRouterPush } = useChangeRouter();
  const { searchQuery } = useSearchRouter();
  const [currentSortOrder, setCurrentSortOrder] = useState(
    sortConverter(ORDER_VARIANTS[0]),
  );
  const [ref, inView] = useInView();
  // 카테고리 상품
  const { data: categories } = useGetCategory();
  const {
    fetchNextPage,
    hasNextPage,
    data: products,
    isLoading,
    isSuccess,
  } = useGetInfiniteProducts({
    categoryId: Number(currentQuery.categoryId),
    order: currentSortOrder,
    keyword: searchQuery,
  });
  const productsList = products?.pages.flatMap((page) => page.list) || [];
  // TOP 6 정렬 상품
  const { data: sortedProducts, isPending: isLoadingSortedProducts } =
    useGetSortedProducts();
  // 리뷰어 랭킹
  const { data: rankingData } = useGetFollowersRanking();
  const sliceRankingData = rankingData?.slice(0, 5);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, products, fetchNextPage]);

  return (
    <MogazoaLayout>
      <div className="flex border-b border-var-black3 md:hidden">
        <SlideMenuBar
          categories={categories}
          currentCategory={validateArray(currentQuery.category)}
          onClick={handleRouterPush}
        />
      </div>
      <div className="flex justify-center">
        <div className="hidden md:flex">
          <CategoryMenu
            categories={categories}
            currentCategoryName={validateArray(currentQuery.category)}
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
                  currentCategoryName={validateArray(currentQuery.category)}
                  changeSortOrder={(order) =>
                    setCurrentSortOrder(sortConverter(order))
                  }
                />
                {isSuccess && <div ref={ref} />}
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
