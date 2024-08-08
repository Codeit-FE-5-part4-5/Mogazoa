import Image from 'next/image';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import Button from '../../../Button/Button';

const ProductsFetchErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();

  const result = {
    message: error?.response?.data.message ?? '',
    code: error?.response?.status ?? '',
  };

  const handleClickReset = () => {
    resetErrorBoundary();
    reset();
  };

  return (
    <div className="mb-[120px] mt-[80px] flex flex-col items-center gap-[20px]">
      <div className="flex w-fit flex-col items-center gap-[20px]">
        <Image src="/error.svg" alt="에러화면" width={100} height={100} />
        <h1 className="text-center text-[24px] font-normal leading-normal text-[#6E6E82]">
          상품을 불러오는데 실패하였습니다!
        </h1>
        <h2 className="text-var-gray1">{result.code}</h2>
        <h2 className="text-var-gray1">{result.message}</h2>
        <div className="w-full">
          <Button text="재시도" variant="tertiary" onClick={handleClickReset} />
        </div>
      </div>
    </div>
  );
};

export default ProductsFetchErrorFallback;
