import RankingCard from '../RankingCard/RankingCard';

export const RankingList: React.FC = () => {
  const mockRanking = {
    img: '/images/Ellipse48.svg',
    alt: '예시2',
    name: '리뷰왕',
    follower: 1245,
    review: 1243,
  };

  return (
    <div className="ml-[20px] mt-[45px] flex flex-col gap-[20px] overflow-x-auto bg-[#1C1C22] text-[#F1F1F5] xl:order-1 xl:h-full xl:w-[250px]">
      <div className="text-[14px]">리뷰어 랭킹</div>
      <div className="flex gap-[10px] xl:flex xl:flex-col xl:items-start xl:gap-[30px]">
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
      </div>
    </div>
  );
};
