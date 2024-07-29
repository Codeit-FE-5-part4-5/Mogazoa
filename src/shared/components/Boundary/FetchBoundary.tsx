import { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProductsFetchErrorFallback from './Fallback/ProductsFetchErrorFallback';

const errorFallbackVariants = new Map([
  ['productsCard', ProductsFetchErrorFallback],
]);

type Variant = 'productsCard';

interface FetchBoundaryProps {
  children: ReactElement;
  variant: Variant;
}

const FetchBoundary = ({ children, variant }: FetchBoundaryProps) => {
  const renderedFallback = errorFallbackVariants.get(variant)!;

  return (
    <ErrorBoundary FallbackComponent={renderedFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default FetchBoundary;
