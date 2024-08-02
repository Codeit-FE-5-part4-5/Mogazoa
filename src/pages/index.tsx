import { dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';

import { meService } from '@/models/auth/useGetMe';
import { productsService } from '@/models/product/useGetInfiniteProducts';
import { bestProductsService } from '@/models/product/useGetProducts';
import { sortedProductsService } from '@/models/product/useGetSortedProducts';

import { ORDER_VARIANTS } from '@/shared/constants/products';
import sortConverter from '@/shared/utils/sortConverter';
import castArray from '@/shared/utils/castArray';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import useSearchRouter from '@/shared/hooks/useSearchRouter';

import RankingList from '@/shared/components/RankingList/RankingList';
import CategoryMenu from '@/shared/components/CategoryMenu/CategoryMenu';
import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import FetchBoundary from '@/shared/components/Boundary/FetchBoundary';
import SortedProductList from '@/shared/components/SortedProductList/SortedProductList';
import ProductSection from '@/shared/components/ProductSection/ProductSection';
import queryClient from '@/lib/query';
import getServerToken from '@/shared/utils/getServerToken';
import getServerQuery from '@/shared/utils/getServerQuery';

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
