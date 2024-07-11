import ActivityCard from '@/shared/components/ActivityCard/ActivityCard';
import Floating from '@/shared/components/Floating/Floating';
import { Header } from '@/shared/components/header/header';
import ProductCard from '@/shared/components/ProductCard/ProductCard';
import ProfileCard from '@/shared/components/ProfileCard/ProfileCard';
import useGetCreatedProducts from '@/shared/models/user/products/useGetCreatedProducts';
import useUserProfile from '@/shared/models/user/profile/useUserProfile';
import { Product } from '@/shared/types/product/product';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

const mockAverageScore = 5;
const mockProductCard = {
  name: '다이슨 슈퍼소닉 블루',
  reviews: 129,
  steamed: 34,
  score: 4.8,
};

const UserProfile = () => {
  const params = useParams();

  const { data: user } = useUserProfile(Number(params?.userId));
  const { data: createdProducts } = useGetCreatedProducts(
    Number(params?.userId),
  );

  // console.log(createdProducts?.data.list);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center px-5 text-var-white xl:flex-row xl:place-items-start xl:space-x-10">
        <div className="w-full max-w-[940px] xl:w-[340px]">
          <ProfileCard user={user?.data} />
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
                <ActivityCard
                  status="reviewsLeft"
                  conScore={mockAverageScore}
                />
              </div>
              <div className="w-full">
                <ActivityCard
                  status="interest"
                  text="전자기기"
                  color="#23b581"
                />
              </div>
            </div>
          </div>
          <div className="space-y-[30px]">
            <div className="flex space-x-10">
              <div>리뷰 남긴 상품</div>
              <div>등록한 상품</div>
              <div>찜한 상품</div>
            </div>
            <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
              {createdProducts?.data.list.map((createdProduct: Product) => {
                return (
                  <ProductCard
                    key={createdProduct.id}
                    name={createdProduct.name}
                    image={createdProduct.image}
                    reviewCount={createdProduct.reviewCount}
                    favoriteCount={createdProduct.favoriteCount}
                    rating={createdProduct.rating}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed" style={{ bottom: '10%', right: '10%' }}>
        <Floating onClick={() => console.log('...')} />
      </div>
    </div>
  );
};

export default UserProfile;
