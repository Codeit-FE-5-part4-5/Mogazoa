import { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import FetchErrorFallback from './Fallback/FetchErrorFallback';

interface FetchBoundaryProps {
  children: ReactElement;
}

const FetchBoundary = ({ children }: FetchBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={FetchErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default FetchBoundary;
