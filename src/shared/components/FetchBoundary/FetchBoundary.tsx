import { ReactElement, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';

interface FetchBoundaryProps {
  children: ReactElement;
}

const FetchBoundary = ({ children }: FetchBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Spinner isLoading isTimeout={false} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default FetchBoundary;
