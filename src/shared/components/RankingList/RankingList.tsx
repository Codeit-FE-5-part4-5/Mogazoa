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
    <div className="flex w-[810px] flex-col gap-[20px] bg-[#1C1C22] text-[#F1F1F5] md:w-[828px] xl:h-full xl:w-[250px]">
      <div className="text-[14px] font-normal xl:pb-[20px] xl:pl-[34px] xl:pt-[45px]">
        리뷰어 랭킹
      </div>
      <div className="flex gap-[15px] xl:flex xl:flex-shrink-0 xl:flex-col xl:items-start xl:gap-[30px] xl:px-[30px]">
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
      </div>
    </div>
  );
};
