import { useSuspenseQuery } from '@tanstack/react-query';
import followersRankingService from '@/models/services/follow/followers/followersRankingService';
import RankingCard from '../RankingCard/RankingCard';

const RankingList = () => {
  const rankingData = useSuspenseQuery(followersRankingService.queryOptions());
  const sliceRankingData = rankingData?.data?.slice(0, 5);

  return (
    <div className="mt-[45px] flex flex-shrink-0 flex-col gap-[20px] bg-[#1C1C22] text-[#F1F1F5] xl:w-[300px]">
      <div className="ml-[20px] text-[14px] font-bold">리뷰어 랭킹</div>
      <div className="flex overflow-x-auto no-scrollbar xl:flex xl:flex-col xl:items-start xl:gap-[10px]">
        {sliceRankingData?.map((item, index) => {
          const {
            image,
            nickname,
            followersCount,
            reviewCount,
            description,
            id,
          } = item;
          return (
            followersCount > 0 && (
              <RankingCard
                id={id}
                key={id}
                image={image}
                nickname={nickname}
                followersCount={followersCount}
                reviewCount={reviewCount}
                description={description}
                ranking={index}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default RankingList;
