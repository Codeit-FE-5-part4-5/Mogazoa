import { ReactElement, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Spinner from '../Spinner/Spinner';
import FetchErrorFallback from './FetchErrorFallback';

interface FetchBoundaryProps {
  children: ReactElement;
}

const FetchBoundary = ({ children }: FetchBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={FetchErrorFallback}>
      <Suspense fallback={<Spinner isLoading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default FetchBoundary;
