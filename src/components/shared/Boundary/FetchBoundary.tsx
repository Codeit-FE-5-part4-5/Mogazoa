import { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProductsFetchErrorFallback from './Fallback/ProductsFetchErrorFallback';
import Spinner from '../Spinner/Spinner';

const errorFallbackVariants = new Map([
  ['productsCard', ProductsFetchErrorFallback],
  ['rankingList', null],
]);

const suspenseFallbackVariants = new Map([
  ['productsCard', null],
  ['rankingList', null],
]);

type TFallback = 'productsCard' | 'rankingList';

interface Props {
  variant: TFallback;
}

const FetchBoundary = ({ children, variant }: PropsWithChildren<Props>) => {
  const renderedErrorFallback = errorFallbackVariants.get(variant)!;
  const renderedSuspenseFallback = suspenseFallbackVariants.get(variant) ?? (
    <Spinner isLoading />
  );

  return (
    <ErrorBoundary FallbackComponent={renderedErrorFallback}>
      <Suspense fallback={renderedSuspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default FetchBoundary;
