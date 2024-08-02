import { memo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { followersRankingService } from '@/models/queries/user/follow/followers/useGetFollowersRanking';
import RankingCard from '../RankingCard/RankingCard';

const RankingList = () => {
  const rankingData = useSuspenseQuery(followersRankingService.queryOptions());
  const sliceRankingData = rankingData?.data?.slice(0, 5);
  return (
    <div className="ml-[20px] mt-[45px] flex flex-col gap-[20px] overflow-x-auto bg-[#1C1C22] text-[#F1F1F5] no-scrollbar xl:order-1 xl:h-full xl:w-[250px]">
      <div className="text-[14px]">리뷰어 랭킹</div>
      <div className="flex gap-[10px] xl:flex xl:flex-col xl:items-start xl:gap-[30px]">
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

export default memo(RankingList);
