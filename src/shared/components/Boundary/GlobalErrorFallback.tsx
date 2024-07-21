import useChangeRouter from '@/shared/hooks/useChangeRouter';
import { FallbackProps } from 'react-error-boundary';
import Button from '../Button/Button';

const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { handleRedirect } = useChangeRouter();
  const result = {
    message: error?.response?.data.message ?? '',
    code: error?.response?.data.code ?? '',
  };

  const handleRedirectPage = (page: string) => {
    resetErrorBoundary();
    handleRedirect(page);
  };

  return (
    <div>
      <h2 className="text-[16px] text-var-red">{result.code}</h2>
      <h2 className="text-[16px] text-var-red">{result.message}</h2>
      <div>
        <Button
          text={result.code === 401 ? '로그인 이동' : '메인화면 이동'}
          variant="tertiary"
          onClick={() =>
            handleRedirectPage(result.code === 401 ? '/signin' : '/')
          }
        />
      </div>
    </div>
  );
};

export default GlobalErrorFallback;
