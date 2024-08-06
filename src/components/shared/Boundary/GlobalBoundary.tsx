import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalErrorFallback from './Fallback/Error/GlobalErrorFallback';

interface GlobalBoundaryProps {
  children: ReactNode;
}

const GlobalBoundary = ({ children }: GlobalBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default GlobalBoundary;
