import RankingCard from '../RankingCard/RankingCard';
import closed from '@/../../public/close.svg';

export const RankingList = () => {
  const mockRanking = {
    img: '/images/Ellipse48.svg',
    alt: '예시2',
    name: '리뷰왕',
    follower: 1245,
    review: 1243,
  };
  return <RankingCard mockRanking={mockRanking} />;
};
