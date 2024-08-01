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
  const categoryId = Number(query.categoryId) || 0;
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
  const sortedProducts = useGetSortedProducts();
  const bestProducts = useGetBestProducts(Number(currentQuery.categoryId));
  const rankingData = useGetFollowersRanking();
  const products = useGetInfiniteProducts({
    categoryId: Number(currentQuery.categoryId),
    order: castArray(currentQuery.order),
    keyword: searchQuery,
  });
  const sliceBestProducts = useMemo(
    () => bestProducts?.data?.slice(0, 6),
    [bestProducts],
  );
  const sliceRankingData = useMemo(
    () => rankingData?.data?.slice(0, 5),
    [rankingData],
  );
  const [ref, isIntersect] = useIntersect<HTMLDivElement>(products.isLoading);

  useEffect(() => {
    if (products.hasNextPage && isIntersect) {
      products.fetchNextPage();
    }
  }, [isIntersect, products, products.fetchNextPage, products.hasNextPage]);

  return (
    <MogazoaLayout>
      <div className="flex flex-col justify-center md:flex-row">
        <CategoryMenu
          currentCategoryName={castArray(currentQuery.category)}
          handleClickCategory={updateQueryParam}
        />
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <RankingList rankingData={sliceRankingData} />
          <div className="flex-1">
            {currentQuery.category || searchQuery ? (
              <ProductSection
                targetRef={ref}
                isLoading={sortedProducts.isLoading || products.isLoading}
                products={products?.data?.pages}
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
                  sortedProducts={sortedProducts.data}
                  isLoading={sortedProducts.isLoading}
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
