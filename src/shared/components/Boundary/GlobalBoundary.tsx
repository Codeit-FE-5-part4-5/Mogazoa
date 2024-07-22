import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Spinner from '../Spinner/Spinner';
import GlobalErrorFallback from './GlobalErrorFallback';

interface GlobalBoundaryProps {
  children: ReactNode;
}

const GlobalBoundary = ({ children }: GlobalBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <Suspense fallback={<Spinner isLoading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default GlobalBoundary;
