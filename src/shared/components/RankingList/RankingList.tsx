import { FollowerRanking } from '@/shared/types/follow/followers/followers-type';
import RankingCard from '../RankingCard/RankingCard';

interface Prop {
  rankingData?: FollowerRanking[];
}

export const RankingList: React.FC<Prop> = ({ rankingData }) => {
  return (
    <div className="ml-[20px] mt-[45px] flex flex-col gap-[20px] overflow-x-auto bg-[#1C1C22] text-[#F1F1F5] no-scrollbar xl:order-1 xl:h-full xl:w-[250px]">
      <div className="text-[14px]">리뷰어 랭킹</div>
      <div className="flex gap-[10px] xl:flex xl:flex-col xl:items-start xl:gap-[30px]">
        {rankingData?.map((item, index) => {
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
