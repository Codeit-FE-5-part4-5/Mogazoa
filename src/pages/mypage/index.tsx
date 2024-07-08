import ActivityCard from '@/shared/components/ActivityCard/ActivityCard';
import Floating from '@/shared/components/Floating/Floating';
import { Header } from '@/shared/components/header/header';
import MyProfileCard from '@/shared/components/MyProfileCard/MyProfileCard';
import ProductCard from '@/shared/components/ProductCard/ProductCard';

const mockAverageScore = 5;
const mockProductCard = {
  name: '다이슨 슈퍼소닉 블루',
  reviews: 129,
  steamed: 34,
  score: 4.8,
};

const MyPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center px-5 text-var-white xl:flex-row xl:place-items-start xl:space-x-10">
        <div className="w-full max-w-[940px] xl:w-[340px]">
          <MyProfileCard />
        </div>
        <div className="w-full space-y-20 xl:w-[940px]">
          <div className="mt-[50px] space-y-[30px] xl:mt-0">
            <div>활동 내역</div>
            <div className="flex space-x-2.5 xl:space-x-5">
              <div className="w-full">
                <ActivityCard
                  status="averageLeft"
                  conScore={mockAverageScore}
                />
              </div>
              <div className="w-full">
                <ActivityCard status="interest" conScore={mockAverageScore} />
              </div>
              <div className="w-full">
                <ActivityCard
                  status="reviewsLeft"
                  text="전자기기"
                  color="#23b581"
                />
              </div>
            </div>
          </div>
          <div className="space-y-[30px]">
            <div>리뷰 남긴 상품</div>
            <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
              <ProductCard
                name={mockProductCard.name}
                reviews={mockProductCard.reviews}
                steamed={mockProductCard.steamed}
                score={mockProductCard.score}
              />
              <ProductCard
                name={mockProductCard.name}
                reviews={mockProductCard.reviews}
                steamed={mockProductCard.steamed}
                score={mockProductCard.score}
              />
              <ProductCard
                name={mockProductCard.name}
                reviews={mockProductCard.reviews}
                steamed={mockProductCard.steamed}
                score={mockProductCard.score}
              />
              <ProductCard
                name={mockProductCard.name}
                reviews={mockProductCard.reviews}
                steamed={mockProductCard.steamed}
                score={mockProductCard.score}
              />
              <ProductCard
                name={mockProductCard.name}
                reviews={mockProductCard.reviews}
                steamed={mockProductCard.steamed}
                score={mockProductCard.score}
              />
              <ProductCard
                name={mockProductCard.name}
                reviews={mockProductCard.reviews}
                steamed={mockProductCard.steamed}
                score={mockProductCard.score}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[90px] right-[180px]">
        <Floating onClick={() => console.log('...')} />
      </div>
    </div>
  );
};

export default MyPage;
