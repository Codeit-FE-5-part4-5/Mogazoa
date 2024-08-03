import { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProductsFetchErrorFallback from './Fallback/ProductsFetchErrorFallback';
import Spinner from '../Spinner/Spinner';

type TFallback = 'productsCard' | 'rankingList' | 'navMenu' | 'navAuth';

interface Props {
  variant: TFallback;
}

const errorFallbackVariants = new Map([
  ['productsCard', ProductsFetchErrorFallback],
  ['rankingList', null],
  ['navMenu', null],
  ['navAuth', null],
]);

const suspenseFallbackVariants = new Map([
  ['productsCard', null],
  ['rankingList', null],
  ['navMenu', null],
  ['navAuth', null],
]);

const FetchBoundary = ({ children, variant }: PropsWithChildren<Props>) => {
  const renderedErrorFallback = errorFallbackVariants.get(variant)!;
  const renderedSuspenseFallback = suspenseFallbackVariants.get(variant)!;

  return (
    <ErrorBoundary FallbackComponent={renderedErrorFallback}>
      <Suspense fallback={renderedSuspenseFallback ?? <Spinner isLoading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default FetchBoundary;
