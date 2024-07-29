import Image from 'next/image';
import { FallbackProps } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import Button from '../../Button/Button';

const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { handleRedirect } = useChangeRouter();
  const { reset } = useQueryErrorResetBoundary();

  const result = {
    message: error?.response?.data.message ?? '',
    code: error?.response?.status ?? '',
  };

  const handleRedirectPage = (page: string) => {
    resetErrorBoundary();
    reset();
    handleRedirect(page);
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="flex h-full w-fit flex-col items-center justify-center gap-[20px]">
        <Image src="/error.svg" alt="에러사진" width={100} height={100} />

        <h1 className="text-[24px] text-var-gray1">
          일시적인 오류입니다. 잠시 후 다시 시도하세요.
        </h1>
        <h2 className="text-var-gray1">{result.code}</h2>
        <h2 className="text-var-gray1">{result.message}</h2>

        <div className="w-full">
          <Button
            text={result.code === 401 ? '로그인 이동' : '메인화면 이동'}
            onClick={() =>
              handleRedirectPage(result.code === 401 ? '/signin' : '/')
            }
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorFallback;
