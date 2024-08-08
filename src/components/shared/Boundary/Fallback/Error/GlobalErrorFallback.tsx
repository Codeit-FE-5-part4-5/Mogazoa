import Image from 'next/image';
import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import useChangeRouter from '@/hooks/useChangeRouter';
import Button from '../../../Button/Button';

const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { handleRedirect } = useChangeRouter();
  const { reset } = useQueryErrorResetBoundary();

  const result = {
    message: error?.response?.data.message ?? '',
    code: error?.response?.status ?? '',
  };

  if (!result.code) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  const handleRedirectPage = () => {
    resetErrorBoundary();
    reset();
    handleRedirect('/');
  };

  useEffect(() => {
    if (!result.code) {
      handleRedirect('/');
    }
  }, []);

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
          <Button text="메인화면 이동" onClick={handleRedirectPage} />
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorFallback;
