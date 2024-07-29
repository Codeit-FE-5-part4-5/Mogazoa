import Image from 'next/image';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import Button from '../../Button/Button';

const ProductsFetchErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const result = {
    message: error?.response?.data.message ?? '',
    code: error?.response?.data.code ?? '',
  };

  const handleClickReset = () => {
    resetErrorBoundary();
    reset();
  };

  return (
    <div className="mb-[120px] mt-[80px] flex flex-col items-center gap-[20px]">
      <div className="relative h-[32px] w-[39px] xl:h-[40px] xl:w-[49px]">
        <Image
          src="/error.svg"
          alt="에러화면"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h2 className="text-[16px] text-var-red">{result.code}</h2>
      <h2 className="text-[16px] text-var-red">{result.message}</h2>
      <p className="text-center text-lg font-normal leading-normal text-[#6E6E82]">
        첫번째 상품을 등록해보세요!
      </p>
      <Button text="재시도" variant="tertiary" onClick={handleClickReset} />
    </div>
  );
};

export default ProductsFetchErrorFallback;
