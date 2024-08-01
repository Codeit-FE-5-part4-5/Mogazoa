import { useEffect, useMemo } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';

import useGetFollowersRanking from '@/models/user/follow/followers/useGetFollowersRanking';
import useGetInfiniteProducts, {
  ProductsQueryOption,
} from '@/models/product/useGetInfiniteProducts';
import useGetSortedProducts, {
  sortedProductsQueryOption,
} from '@/models/product/useGetSortedProducts';
import { meQueryOption } from '@/models/auth/useGetMe';

import { ORDER_VARIANTS } from '@/shared/constants/products';
import sortConverter from '@/shared/utils/sortConverter';
import castArray from '@/shared/utils/castArray';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import useSearchRouter from '@/shared/hooks/useSearchRouter';
import useIntersect from '@/shared/hooks/useIntersect';

import RankingList from '@/shared/components/RankingList/RankingList';
import CategoryMenu from '@/shared/components/CategoryMenu/CategoryMenu';
import SlideMenuBar from '@/shared/components/SlideMenuBar/SlideMenuBar';
import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import ProductSection from '@/shared/components/ProductSection/ProductSection';
import FetchBoundary from '@/shared/components/Boundary/FetchBoundary';
import SortedProductList from '@/shared/components/SortedProductList/SortedProductList';
import useGetBestProducts, {
  bestProductsQueryOption,
} from '@/models/product/useGetProducts';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookieHeader = context.req.headers.cookie || '';
  const cookies = cookie.parse(cookieHeader);
  const { accessToken } = cookies;
  const { query } = context;
  const categoryId = castArray(query.categoryId) || '';
  const keyword = castArray(query.search) || '';
  const order = castArray(query.order) || '';
  const orderVariants = ORDER_VARIANTS.map((item) => sortConverter(item));

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
    },
  });

  if (accessToken) {
    await queryClient.prefetchQuery(meQueryOption(accessToken));
  }

  if (categoryId) {
    await queryClient.prefetchInfiniteQuery(
      ProductsQueryOption({ keyword, categoryId, order }),
    );
    await queryClient.prefetchQuery(bestProductsQueryOption(categoryId));
  } else {
    await Promise.all([
      queryClient.prefetchQuery(sortedProductsQueryOption(orderVariants[0])),
      queryClient.prefetchQuery(sortedProductsQueryOption(orderVariants[1])),
      queryClient.prefetchQuery(sortedProductsQueryOption(orderVariants[2])),
    ]);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home = () => {
  const { currentQuery, updateQueryParam, appendQueryParam } =
    useChangeRouter();
  const { searchQuery } = useSearchRouter();
  // 카테고리 상품
  const {
    fetchNextPage,
    hasNextPage,
    data: products,
    isLoading: isProductLoading,
  } = useGetInfiniteProducts({
    categoryId: Number(currentQuery.categoryId),
    order: castArray(currentQuery.order),
    keyword: searchQuery,
  });
  // 각 정렬별 베스트 상품
  const { data: sortedProducts, isLoading: isSortedProductsLoading } =
    useGetSortedProducts();
  const [ref, isIntersect] = useIntersect<HTMLDivElement>(isProductLoading);
  // 각 카테고리별 베스트 상품
  const { data: bestProducts } = useGetBestProducts(
    Number(currentQuery.categoryId),
  );
  const sliceBestProducts = useMemo(
    () => bestProducts?.slice(0, 6),
    [bestProducts],
  );
  // 리뷰어 랭킹
  const { data: rankingData } = useGetFollowersRanking();
  const sliceRankingData = useMemo(
    () => rankingData?.slice(0, 5),
    [rankingData],
  );

  useEffect(() => {
    if (hasNextPage && isIntersect) {
      fetchNextPage();
    }
  }, [isIntersect, fetchNextPage, hasNextPage]);

  return (
    <MogazoaLayout>
      <div className="flex border-b border-var-black3 md:hidden">
        <SlideMenuBar
          currentCategory={castArray(currentQuery.category)}
          onClick={updateQueryParam}
        />
      </div>
      <div className="flex justify-center">
        <div className="hidden md:flex">
          <CategoryMenu
            currentCategoryName={castArray(currentQuery.category)}
            handleClickCategory={updateQueryParam}
          />
        </div>
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <RankingList rankingData={sliceRankingData} />
          <div className="flex-1">
            {currentQuery.category || searchQuery ? (
              <ProductSection
                targetRef={ref}
                isLoading={isSortedProductsLoading || isProductLoading}
                products={products?.pages}
                bestProducts={sliceBestProducts}
                searchQuery={searchQuery}
                currentCategoryName={castArray(currentQuery.category)}
                changeSortOrder={(order) =>
                  appendQueryParam({ order: sortConverter(order) })
                }
              />
            ) : (
              <FetchBoundary variant="productsCard">
                <SortedProductList
                  sortedProducts={sortedProducts}
                  isLoading={isSortedProductsLoading}
                />
              </FetchBoundary>
            )}
          </div>
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default Home;
