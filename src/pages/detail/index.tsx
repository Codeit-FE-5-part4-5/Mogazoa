import Button from '@/shared/components/Button/Button';
import Chip from '@/shared/components/Chip/Chip';
import ReviewProfileCard from '@/shared/components/ReviewProfileCard/ReviewProfileCard';
import StatisticsCard from '@/shared/components/StatisticsCard/StatisticsCard';
import { Header } from '@/shared/components/header/header';
import Icon from '@/shared/components/icon/icon';
import Image from 'next/image';
import { useState } from 'react';

const mockProduct = {
  id: 1,
  name: '에어팟 프로',
  description: '노이즈 캔슬링이 잘 되는 이어폰',
  image:
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1591634795000',
  rating: 4.5,
  reviewCount: 100,
  favoriteCount: 1000,
  categoryId: 1,
  createdAt: '2024-06-21T10:53:49.062Z',
  updatedAt: '2024-06-21T10:53:49.062Z',
  writerId: 1,
  isFavorite: false,
  category: {
    id: 1,
    name: '전자제품',
  },
  categoryMetric: {
    rating: 4.5,
    favoriteCount: 1000,
    reviewCount: 100,
  },
};

const exUser = {
  name: '박준영',
  star: 4,
};

export default function ProductDetails() {
  const [heart, setHeart] = useState(false);

  return (
    <>
      <Header />
      <div className="px-[20px]">
        <div className="flex w-full flex-shrink-0 flex-col items-start gap-[40px] pb-[60px] pt-[30px] text-white">
          <div className="flex w-full flex-shrink-0 flex-col items-start gap-5">
            <div className="px-[23px] py-[10px]">
              <Image
                className="rounded-lg"
                src={mockProduct.image}
                alt="리뷰이미지"
                layout="responsive"
                width={289}
                height={249}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2.5">
              <div className="flex w-full items-center justify-between">
                <Chip text={'전자기기'} color={'#23b581'} size={'s'} />
                <div className="flex items-center gap-[10px]">
                  <button className="flex items-start gap-2.5 rounded-md bg-[#252530] p-[5px]">
                    <Icon
                      src={'/kakao.svg'}
                      alt="kakao"
                      width={18}
                      height={18}
                    />
                  </button>
                  <button className="flex items-start gap-2.5 rounded-md bg-[#252530] p-[5px]">
                    <Icon
                      src={'/images/share_300.svg'}
                      alt="share"
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-[20px] font-semibold leading-[28px] text-white">
                  {mockProduct.name}
                </div>
                {heart ? (
                  <Icon
                    src={'/images/heart.svg'}
                    alt="찜"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Icon
                    src={'/images/heart_none.svg'}
                    alt="찜 해제"
                    width={24}
                    height={24}
                  />
                )}
              </div>
            </div>
            <div className="font-pretendard text-[14px] font-normal leading-[20px] text-[#F1F1F5]">
              {mockProduct.description}
            </div>
          </div>
          <div className="flex w-full flex-shrink-0 flex-col items-start gap-3.5">
            <Button text={'리뷰 작성하기'} className={'w-full'} />
            <Button
              text={'비교하기'}
              className={'w-full'}
              variant="secondary"
            />
          </div>
        </div>
        <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
          상품 정보
        </h1>
        <div className="flex flex-col gap-[15px] pb-[60px]">
          <div className="w-full">
            <StatisticsCard status={'average'} conScore={mockProduct.rating} />
          </div>
          <div className="w-full">
            <StatisticsCard
              status={'steamed'}
              conScore={mockProduct.favoriteCount}
            />
          </div>
          <div className="w-full">
            <StatisticsCard
              status={'review'}
              conScore={mockProduct.reviewCount}
            />
          </div>
        </div>
        <div className="">
          <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
            상품 리뷰
          </h1>
        </div>
        <div className="mb-[15px] rounded-lg border border-[#353542] bg-[#252530] px-[20px] py-[20px] text-[#F1F1F5]">
          <div className="inline-flex items-center gap-[10px] pb-[30px]">
            <ReviewProfileCard user={exUser} />
          </div>
          <div className="flex flex-shrink-0 flex-col items-start gap-[20px]">
            <p className="font-pretendard text-[12px] font-normal leading-[16px] text-[#F1F1F5]">
              음질 미칩니다ㅎㅎ 최고예용~ 어플 연동으로 음향 설정 및 설정모드
              되고, 설정별로 사운드감이 틀려요 서라운드 느낌까지 들고, 따로는
              베이스깐 우퍼 느낌도 있어요
            </p>
            <div className="flex w-full items-center justify-between">
              <p className="font-pretendard text-[12px] font-normal leading-normal text-[#6E6E82]">
                2024-12-28
              </p>
              <div className="flex items-start justify-center gap-[10px] rounded-full border border-[#353542] bg-[#252530] p-[6px_10px]">
                <div className="flex items-center gap-2.5">
                  <Icon
                    src={'/images/heart.svg'}
                    alt="좋아요"
                    width={14}
                    height={14}
                  />
                  <div>7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
