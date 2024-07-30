import { useEffect, useState } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import cookie from 'cookie';

import useGetFollowersRanking from '@/shared/models/user/follow/followers/useGetFollowersRanking';
import useGetCategory from '@/shared/models/category/useGetCategory';
import useGetInfiniteProducts from '@/shared/models/product/useGetInfiniteProducts';

import sortConverter from '@/shared/utils/sortConverter';
import castArray from '@/shared/utils/castArray';
import { ORDER_VARIANTS } from '@/shared/constants/products';
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookieHeader = context.req.headers.cookie || '';
  const cookies = cookie.parse(cookieHeader);
  const { accessToken } = cookies;

  if (!accessToken) {
    return {
      props: {
        dehydratedState: {},
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await axios.get(
        `https://mogazoa-api.vercel.app/5-5/users/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    },
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home = () => {
  const { currentQuery, handleRouterPush } = useChangeRouter();
  const { searchQuery } = useSearchRouter();
  const [currentSortOrder, setCurrentSortOrder] = useState(
    sortConverter(ORDER_VARIANTS[0]),
  );
  // 카테고리 상품
  const { data: categories } = useGetCategory();
  const {
    isFetching,
    fetchNextPage,
    hasNextPage,
    data: products,
    isLoading,
  } = useGetInfiniteProducts({
    categoryId: Number(currentQuery.categoryId),
    order: currentSortOrder,
    keyword: searchQuery,
  });
  const [ref, isIntersect] = useIntersect<HTMLDivElement>(isFetching);
  const productsList = products?.pages.flatMap((page) => page.list) || [];

  // 리뷰어 랭킹
  const { data: rankingData } = useGetFollowersRanking();
  const sliceRankingData = rankingData?.slice(0, 5);

  useEffect(() => {
    if (hasNextPage && isIntersect) {
      fetchNextPage();
    }
  }, [hasNextPage, isIntersect, fetchNextPage]);

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
              <FetchBoundary variant="productsCard">
                <SortedProductList />
              </FetchBoundary>
            )}
          </div>
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default Home;
