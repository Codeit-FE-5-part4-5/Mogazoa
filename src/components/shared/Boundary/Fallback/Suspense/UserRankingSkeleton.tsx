import { PropsWithChildren } from 'react';

const UserRankingSkeleton = () => {
  return (
    <UserRankingSkeleton.Container>
      <UserRankingSkeleton.Card />
      <UserRankingSkeleton.Card />
      <UserRankingSkeleton.Card />
      <UserRankingSkeleton.Card />
      <UserRankingSkeleton.Card />
      <UserRankingSkeleton.Card />
      <UserRankingSkeleton.Card />
      <UserRankingSkeleton.Card />
    </UserRankingSkeleton.Container>
  );
};

UserRankingSkeleton.Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-[45px] flex animate-pulse flex-col gap-[20px] xl:w-[300px]">
      <div className="skeleton-base ml-[20px] h-[20px] w-[80px]" />
      <div className="flex gap-[40px] overflow-x-scroll no-scrollbar xl:flex-col xl:gap-[10px]">
        {children}
      </div>
    </div>
  );
};

UserRankingSkeleton.Card = () => {
  return (
    <div className="flex flex-shrink-0 gap-[8px] py-[10px] xl:w-full xl:px-[20px]">
      <div className="skeleton-base size-[40px] rounded-full" />
      <div className="flex flex-1 flex-shrink-0 flex-col justify-between gap-[8px] xl:flex-row xl:items-center">
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            <div className="skeleton-base h-[16px] w-[28px]" />
            <div className="skeleton-base h-[16px] w-[50px]" />
          </div>
          <div className="flex gap-[14px]">
            <div className="skeleton-base h-[14px] w-[50px]" />
            <div className="skeleton-base h-[14px] w-[28px]" />
          </div>
        </div>
        <div className="skeleton-base h-[24px] w-[48px] self-end xl:ml-auto xl:self-center" />
      </div>
    </div>
  );
};

export default UserRankingSkeleton;
