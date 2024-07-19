import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import Button from '../Button/Button';
import { FallbackProps } from 'react-error-boundary';

const FetchErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const result = {
    message: error?.response?.data.message ?? '',
    code: error?.response?.data.code ?? '',
  };

  const handleClickReset = () => {
    reset();
    resetErrorBoundary();
  };

  return (
    <div>
      <h2 className="text-[16px] text-var-red">{result.code}</h2>
      <h2 className="text-[16px] text-var-red">{result.message}</h2>
      <div>
        <Button text="재시도" variant="tertiary" onClick={handleClickReset} />
      </div>
    </div>
  );
};

export default FetchErrorFallback;
