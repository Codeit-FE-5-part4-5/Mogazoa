import { cn } from '@/lib/cn';
import { PropsWithChildren } from 'react';

const RankingSkeleton = () => {
  return (
    <RankingSkeleton.Container>
      <RankingSkeleton.Card />
      <RankingSkeleton.Card />
      <RankingSkeleton.Card />
      <RankingSkeleton.Card />
      <RankingSkeleton.Card />
      <RankingSkeleton.Card />
      <RankingSkeleton.Card />
      <RankingSkeleton.Card />
    </RankingSkeleton.Container>
  );
};

RankingSkeleton.Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-[45px] flex animate-pulse flex-col gap-[20px] xl:w-[300px]">
      <div
        className={cn(
          'ml-[20px] h-[20px] w-[80px] rounded-[12px] bg-var-black3',
        )}
      />
      <div className="flex gap-[40px] overflow-x-scroll no-scrollbar xl:flex-col xl:gap-[10px]">
        {children}
      </div>
    </div>
  );
};

RankingSkeleton.Card = () => {
  const skeletonVariant = 'bg-var-black3 rounded-[12px]';
  return (
    <div className="flex flex-shrink-0 gap-[8px] py-[10px] xl:w-full xl:px-[20px]">
      <div className={cn('size-[40px]', skeletonVariant, 'rounded-full')} />
      <div className="flex flex-1 flex-shrink-0 flex-col justify-between gap-[8px] xl:flex-row xl:items-center">
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            <div className={cn('h-[16px] w-[28px]', skeletonVariant)} />
            <div className={cn('h-[16px] w-[50px]', skeletonVariant)} />
          </div>
          <div className="flex gap-[14px]">
            <div className={cn('h-[14px] w-[50px]', skeletonVariant)} />
            <div className={cn('h-[14px] w-[28px]', skeletonVariant)} />
          </div>
        </div>
        <div
          className={cn(
            'h-[24px] w-[48px] self-end xl:ml-auto xl:self-center',
            skeletonVariant,
          )}
        />
      </div>
    </div>
  );
};

export default RankingSkeleton;
