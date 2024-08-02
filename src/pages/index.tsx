import { dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';

import { meService } from '@/models/auth/useGetMe';
import { productsService } from '@/models/product/useGetInfiniteProducts';
import { bestProductsService } from '@/models/product/useGetProducts';
import { sortedProductsService } from '@/models/product/useGetSortedProducts';

import queryClient from '@/lib/query';
import getServerToken from '@/utils/getServerToken';
import getServerQuery from '@/utils/getServerQuery';
import { ORDER_VARIANTS } from '@/constants/products';
import sortConverter from '@/utils/sortConverter';
import castArray from '@/utils/castArray';
import useChangeRouter from '@/hooks/useChangeRouter';
import useSearchRouter from '@/hooks/useSearchRouter';

import RankingList from '@/components/feature/ranking/RankingList/RankingList';
import CategoryMenu from '@/components/layout/CategoryMenu/CategoryMenu';
import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import FetchBoundary from '@/components/shared/Boundary/FetchBoundary';
import SortedProductList from '@/components/feature/product/SortedProductList/SortedProductList';
import ProductSection from '@/components/feature/product/ProductSection/ProductSection';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = getServerToken(context);
  const { categoryId, keyword, order } = getServerQuery(context);
  const orderVariants = ORDER_VARIANTS.map((item) => sortConverter(item));

  if (accessToken) {
    await queryClient.prefetchQuery(meService.queryOptions(accessToken));
  }

  if (categoryId) {
    await queryClient.prefetchInfiniteQuery(
      productsService.queryOptions({ keyword, categoryId, order }),
    );
    await queryClient.prefetchQuery(
      bestProductsService.queryOptions(categoryId),
    );
  } else {
    await Promise.all([
      queryClient.prefetchQuery(
        sortedProductsService.queryOptions(orderVariants[0]),
      ),
      queryClient.prefetchQuery(
        sortedProductsService.queryOptions(orderVariants[1]),
      ),
      queryClient.prefetchQuery(
        sortedProductsService.queryOptions(orderVariants[2]),
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
          currentCategoryName={castArray(currentQuery.category)}
          handleClickCategory={updateQueryParam}
        />
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <FetchBoundary variant="rankingList">
            <RankingList />
          </FetchBoundary>
          <div className="flex-1">
            {currentQuery.category || searchQuery ? (
              <ProductSection
                searchQuery={searchQuery}
                currentQuery={currentQuery}
                currentCategoryName={castArray(currentQuery.category)}
                changeSortOrder={(order) =>
                  appendQueryParam({ order: sortConverter(order) })
                }
              />
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
