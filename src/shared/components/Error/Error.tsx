import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';

const Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();
  resetErrorBoundary();
  reset();
  console.log(error);
  return (
    <div>
      <h1>{error}</h1>
      <h2 className="text-[16px] text-var-blue">sdfasdfas</h2>
    </div>
  );
};

export default Error;
