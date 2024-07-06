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
    <div className="flex w-[810px] flex-col gap-[20px] bg-[#1C1C22] text-[#F1F1F5] md:w-[828px] lg:h-full lg:w-[250px]">
      <div className="text-[14px] font-normal lg:pb-[20px] lg:pl-[34px] lg:pt-[45px]">
        리뷰어 랭킹
      </div>
      <div className="flex gap-[15px] lg:flex lg:flex-shrink-0 lg:flex-col lg:items-start lg:gap-[30px] lg:px-[30px]">
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
        <RankingCard mockRanking={mockRanking} />
      </div>
    </div>
  );
};
