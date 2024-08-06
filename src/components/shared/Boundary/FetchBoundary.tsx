import { ComponentType, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProductsFetchErrorFallback from './Fallback/Error/ProductsFetchErrorFallback';
import Spinner from '../Spinner/Spinner';
import ProductCardListSkeleton from './Fallback/Suspense/ProductCardListSkeleton';
import UserRankingSkeleton from './Fallback/Suspense/UserRankingSkeleton';
import TrendRankingSkeleton from './Fallback/Suspense/TrendRankingSkeleton';

type TFallback =
  | 'productsCard'
  | 'productsCardWithCarousel'
  | 'userRankingList'
  | 'trendRankingList'
  | 'navMenu'
  | 'navAuth';

const errorFallbackVariants = new Map([
  ['productsCard', ProductsFetchErrorFallback],
  ['rankingList', null],
  ['navMenu', null],
  ['navAuth', null],
]);

const suspenseFallbackVariants = new Map([
  ['productsCard', <ProductCardListSkeleton key="productsCard" />],
  [
    'productsCardWithCarousel',
    <ProductCardListSkeleton hasCarousel key="productsCardWithCarousel" />,
  ],
  ['userRankingList', <UserRankingSkeleton key="userRankingList" />],
  ['trendRankingList', <TrendRankingSkeleton key="trendRankingList" />],
  ['navMenu', null],
  ['navAuth', null],
]);

const withFetchBoundary = <P extends object>(
  Component: ComponentType<P>,
  variant: TFallback,
) => {
  const renderedErrorFallback = errorFallbackVariants.get(variant)!;
  const renderedSuspenseFallback = suspenseFallbackVariants.get(variant)!;

  return (props: P) => (
    <ErrorBoundary FallbackComponent={renderedErrorFallback}>
      <Suspense fallback={renderedSuspenseFallback ?? <Spinner isLoading />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default withFetchBoundary;
