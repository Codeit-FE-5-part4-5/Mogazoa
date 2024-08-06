const TrendRankingSkeleton = () => {
  return (
    <div className="mt-[45px] flex animate-pulse flex-col gap-[20px] xl:w-[300px]">
      <div className="skeleton-base ml-[20px] h-[18px] w-[100px]" />
      <div className="flex flex-col xl:gap-[10px]">
        <TrendRankingSkeleton.Card />
        <TrendRankingSkeleton.Card />
        <TrendRankingSkeleton.Card />
        <TrendRankingSkeleton.Card />
        <TrendRankingSkeleton.Card />
        <TrendRankingSkeleton.Card />
      </div>
    </div>
  );
};

TrendRankingSkeleton.Card = () => {
  return (
    <div className="flex flex-col gap-[8px] px-[12px] py-[8px] xl:px-[20px]">
      <div className="skeleton-base h-[12px] w-[100px]" />
      <div className="flex items-center gap-[8px]">
        <div className="skeleton-base size-[40px]" />
        <div className="flex flex-col gap-[8px]">
          <div className="skeleton-base h-[16px] w-[80px]" />
          <div className="skeleton-base h-[16px] w-[80px]" />
        </div>
      </div>
    </div>
  );
};

export default TrendRankingSkeleton;
