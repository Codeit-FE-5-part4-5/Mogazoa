import Image from 'next/image';
import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import Button from '@/components/shared/Button/Button';
import useChangeRouter from '@/hooks/useChangeRouter';

const Custom404 = () => {
  const { handleRedirect } = useChangeRouter();

  return (
    <MogazoaLayout>
      <div className="mt-[300px] flex justify-center">
        <div className="flex h-full w-fit flex-col items-center justify-center gap-[20px]">
          <Image src="/error.svg" alt="에러사진" width={100} height={100} />

          <h1 className="text-[24px] text-var-gray1">
            존재하지 않는 페이지 입니다.
          </h1>
          <h2 className="text-var-gray1">404</h2>

          <div className="w-full">
            <Button text="메인화면 이동" onClick={() => handleRedirect('/')} />
          </div>
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default Custom404;
