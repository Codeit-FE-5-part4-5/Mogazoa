import RankingCard from '@/shared/components/RankingCard/RankingCard';
import ReviewProfileCard from '@/shared/components/ReviewProfileCard/ReviewProfileCard';
import Follower from '@/shared/components/Follower/Follower';
import StatisticsCard from '@/shared/components/StatisticsCard/StatisticsCard';
import ActivityCard from '@/shared/components/ActivityCard/ActivityCard';
import ProductCard from '@/shared/components/ProductCard/ProductCard';
import ProductDetailCard from '@/shared/components/ProductDetailCard/ProductDetailCard';
import ProductDetailReview from '@/shared/components/ProductDetailReview/ProductDetailReview';
import reviewImg1 from '@/assets/review_image.png';
import { useState } from 'react';

//RankingCard
const mockRanking = {
  img: '/images/Ellipse48.svg',
  alt: '예시2',
  name: '리뷰왕',
  follower: 1245,
  review: 1243,
};

//Follower
const mockFollower = {
  img: '/images/Ellipse48.svg',
  name: '리뷰왕',
  alt: '예시3',
};

//StatisticsCard, ActivityCard
const mockAverageScore = 5;

//ProductCard
const mockProductCard = {
  name: '다이슨 슈퍼소닉 블루',
  reviews: 129,
  steamed: 34,
  score: 4.8,
};

//ProductDetailCard
const mockProductDetail = {
  name: 'Sony WH-1000XM3',
  reviews: 11255,
  description:
    '한층 업그레이드된 고급 노이즈 캔슬과 상황에 맞게 조정되는 스마트 청취 기능을 갖춘 WH-1000XM3 헤드폰으로 더욱 깊은 고요 속에서 청취할 수 있습니다.',
};

//ProductDetailReview, ReviewProfileCard
const mockUser = {
  name: '마수리',
  star: 3,
  // img:""
};

const mockCon = {
  description:
    '전작과 동일하게, 소니 헤드폰 커넥트 애플리케이션을 통한 노이즈 캔슬링 컨트롤이 가능하다. 1000XM2에 있었던 대기압 센서도 그대로 탑재!',
  createdAt: '2014-01-02',
};

export default function index() {
  const [likedByMe, setLikedByMe] = useState<boolean>(false);
  const likeCount = 24;
  const ThumbInfo = {
    likeCount,
    likedByMe,
    setLikedByMe,
  };
  return (
    <div>
      <RankingCard mockRanking={mockRanking} />
      <ReviewProfileCard user={mockUser} />
      <Follower mockFollower={mockFollower} />
      <br />
      <StatisticsCard status="average" conScore={mockAverageScore} />
      <StatisticsCard status="steamed" conScore={mockAverageScore} />
      <StatisticsCard status="review" conScore={mockAverageScore} />
      <br />
      <ActivityCard status="averageLeft" conScore={mockAverageScore} />
      <ActivityCard status="interest" conScore={mockAverageScore} />
      <ActivityCard status="reviewsLeft" text="전자기기" color="#23b581" />
      <br />
      <ProductCard
        name={mockProductCard.name}
        reviews={mockProductCard.reviews}
        steamed={mockProductCard.steamed}
        score={mockProductCard.score}
      />
      <ProductDetailCard
        name={mockProductDetail.name}
        reviews={mockProductDetail.reviews}
        description={mockProductDetail.description}
        text="전자기기"
        color="#23b581"
      />
      <ProductDetailReview
        count={ThumbInfo.likeCount}
        isLikedByMe={ThumbInfo.likedByMe}
        setLikedByMe={ThumbInfo.setLikedByMe}
        user={mockUser}
        content={mockCon}
      />
    </div>
  );
}
