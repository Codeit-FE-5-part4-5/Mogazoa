import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import queryClient from '@/lib/query';
import getServerQuery from '@/lib/getServerQuery';

import productsService from '@/models/services/product/productsService';
import { ORDER_VARIANTS } from '@/constants/products';
import sortConverter from '@/utils/sortConverter';
import castArray from '@/utils/castArray';
import { useChangeRouter, useSearchRouter } from '@/hooks';

import CategoryMenu from '@/components/layout/CategoryMenu/CategoryMenu';
import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import ProductSection from '@/components/feature/product/ProductSection/ProductSection';
import UserRankingSkeleton from '@/components/shared/Boundary/Fallback/Suspense/UserRankingSkeleton';
import TrendRankingSkeleton from '@/components/shared/Boundary/Fallback/Suspense/TrendRankingSkeleton';
import getServerCookie from '@/lib/getServerCookie';
import meService from '@/models/services/auth/meService';

const RankingList = dynamic(() => import('@/components/feature/ranking/reviewer/RankingList/RankingList'), { ssr: false, loading: () => <UserRankingSkeleton /> }); // prettier-ignore
const TrendRankingList = dynamic(() => import('@/components/feature/ranking/product/TrendRankingList/TrendRankingList'), { ssr: false, loading: () => <TrendRankingSkeleton /> }); // prettier-ignore

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { categoryId, keyword, order } = getServerQuery(context);
  const accessToken = getServerCookie(context, 'accessToken');
  const orderVariants = ORDER_VARIANTS.map((item) => sortConverter(item));

  if (accessToken) {
    await queryClient.prefetchQuery(meService.queryOptions(accessToken));
  } else {
    queryClient.removeQueries({ queryKey: ['me'] });
  }

  if (!categoryId) {
    await Promise.all([
      queryClient.prefetchInfiniteQuery(
        productsService.infiniteQueryOptions({ keyword, categoryId, order }),
      ),
      queryClient.prefetchQuery(
        productsService.queryOptions({ categoryId, order: orderVariants[1] }) /** 별점순(rating) */, // prettier-ignore
      ),
    ]);
  } else {
    await Promise.all([
      queryClient.prefetchQuery(
        productsService.queryOptions({ order: orderVariants[1] }) /** 별점순(rating) */, // prettier-ignore
      ),
      queryClient.prefetchQuery(
        productsService.queryOptions({ order: orderVariants[2] }) /** 리뷰순(reviewCount) */, // prettier-ignore
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

  return (
    <MogazoaLayout>
      <div className="flex flex-col justify-center md:flex-row">
        <CategoryMenu
          currentCategory={castArray(currentQuery.category)}
          onCategoryClick={updateQueryParam}
        />
        <main className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <div className="flex flex-col xl:order-1">
            <RankingList />
            <TrendRankingList />
          </div>
          <div className="flex-1">
            <ProductSection
              searchQuery={searchQuery}
              currentQuery={currentQuery}
              currentCategory={castArray(currentQuery.category)}
              onChangeSortOrder={(order) =>
                appendQueryParam({ order: sortConverter(order) })
              }
            />
          </div>
        </main>
      </div>
    </MogazoaLayout>
  );
};

export default Home;
