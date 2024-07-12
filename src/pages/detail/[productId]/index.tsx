import ProductDetailCard from '@/shared/components/ProductDetailCard/ProductDetailCard';
import ProductDetailReview from '@/shared/components/ProductDetailReview/ProductDetailReview';
import StatisticsCard from '@/shared/components/StatisticsCard/StatisticsCard';
import { Header } from '@/shared/components/header/header';
import useGetProductDetail from '@/shared/models/product/useGetProductDetail';
import { useRouter } from 'next/router';
import { useState } from 'react';

const mockUser = {
  name: '박준영',
  star: 4,
};

const mockCon = {
  description:
    '전작과 동일하게, 소니 헤드폰 커넥트 애플리케이션을 통한 노이즈 캔슬링 컨트롤이 가능하다. 1000XM2에 있었던 대기압 센서도 그대로 탑재!',
  createdAt: '2014-01-02',
};

export default function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query;
  const { data } = useGetProductDetail({
    productId: Number(productId),
  });

  const [likedByMe, setLikedByMe] = useState<boolean>(false);
  const likeCount = 24;
  const ThumbInfo = {
    likeCount,
    likedByMe,
    setLikedByMe,
  };

  return (
    <>
      <Header />
      <div className="px-[20px] xl:container md:px-[30px] xl:mx-auto">
        <div className="mb-[60px]">
          <ProductDetailCard
            name={data?.name}
            reviews={1}
            description={data?.description}
            text={data?.category?.name}
            color={'#ffffff'}
            image={data?.image}
          />
        </div>
        <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
          상품 정보
        </h1>
        <div className="flex flex-col gap-[15px] pb-[60px] md:flex-row">
          <div className="w-full">
            <StatisticsCard status={'average'} conScore={data?.rating} />
          </div>
          <div className="w-full">
            <StatisticsCard status={'steamed'} conScore={data?.favoriteCount} />
          </div>
          <div className="w-full">
            <StatisticsCard status={'review'} conScore={data?.reviewCount} />
          </div>
        </div>
        <div className="">
          <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
            상품 리뷰
          </h1>
        </div>
        <div className="mb-[15px]">
          <ProductDetailReview
            count={ThumbInfo.likeCount}
            isLikedByMe={ThumbInfo.likedByMe}
            setLikedByMe={ThumbInfo.setLikedByMe}
            user={mockUser}
            content={mockCon}
          />
        </div>
      </div>
    </>
  );
}
