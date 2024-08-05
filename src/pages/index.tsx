import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import queryClient from '@/lib/query';

import productsService from '@/models/services/product/productsService';
import getServerQuery from '@/lib/getServerQuery';
import { ORDER_VARIANTS } from '@/constants/products';
import sortConverter from '@/utils/sortConverter';
import castArray from '@/utils/castArray';
import { useChangeRouter, useSearchRouter } from '@/hooks';

import CategoryMenu from '@/components/layout/CategoryMenu/CategoryMenu';
import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import ProductSection from '@/components/feature/product/ProductSection/ProductSection';
import RankingList from '@/components/feature/ranking/RankingList/RankingList';
import TrendRankingList from '@/components/feature/product/TrendRankingList/TrendRankingList';
import { FetchBoundary } from '@/components/shared';
import { useCallback } from 'react';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { categoryId, keyword, order } = getServerQuery(context);
  const orderVariants = ORDER_VARIANTS.map((item) => sortConverter(item));

  if (!categoryId) {
    await Promise.all([
      queryClient.prefetchInfiniteQuery(
        productsService.infiniteQueryOptions({ keyword, categoryId, order }),
      ),
      queryClient.prefetchQuery(
        productsService.queryOptions({ categoryId, order: 'rating' }),
      ),
    ]);
  } else {
    await Promise.all([
      queryClient.prefetchQuery(
        productsService.queryOptions({ order: orderVariants[1] }),
      ),
      queryClient.prefetchQuery(
        productsService.queryOptions({ order: orderVariants[2] }),
      ),
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

  const changeSortOrder = useCallback(
    (order: string) => {
      appendQueryParam({ order: sortConverter(order) });
    },
    [appendQueryParam],
  );

  return (
    <MogazoaLayout>
      <div className="flex flex-col justify-center md:flex-row">
        <CategoryMenu
          currentCategory={castArray(currentQuery.category)}
          handleClickCategory={updateQueryParam}
        />
        <main className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <div className="flex flex-col xl:order-1">
            <FetchBoundary variant="rankingList">
              <RankingList />
              <TrendRankingList />
            </FetchBoundary>
          </div>
          <div className="flex-1">
            <FetchBoundary variant="productsCard">
              <ProductSection
                searchQuery={searchQuery}
                currentQuery={currentQuery}
                currentCategoryName={castArray(currentQuery.category)}
                changeSortOrder={changeSortOrder}
              />
            </FetchBoundary>
          </div>
        </main>
      </div>
    </MogazoaLayout>
  );
};

export default Home;
