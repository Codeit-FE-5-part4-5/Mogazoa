import ProductDetailCard from '@/shared/components/ProductDetailCard/ProductDetailCard';
import ProductDetailReview from '@/shared/components/ProductDetailReview/ProductDetailReview';
import StatisticsCard from '@/shared/components/StatisticsCard/StatisticsCard';
import { Header } from '@/shared/components/header/header';
import useGetProductDetail from '@/shared/models/product/useGetProductDetail';
import useGetProductDetailReviews from '../../../shared/models/reviews/useGetProductReview';
import { useRouter } from 'next/router';
import useGetMe from '@/shared/models/auth/useGetMe';
import { getCookie } from '@/shared/utils/cookie';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query;

  const token = getCookie('accessToken');
  const { data: me } = useGetMe(token);
  const userId = me?.data.id;

  const { data: productDetail } = useGetProductDetail({
    productId: Number(productId),
  });

  const [sort, setSort] = useState<
    'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount'
  >('recent');

  const numericProductId =
    productId && !Array.isArray(productId) ? Number(productId) : undefined;

  const { data: productDetailReview } = useGetProductDetailReviews({
    productId: numericProductId,
    order: sort,
  });

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="px-[20px] xl:container md:px-[30px] md:pt-[20px] xl:mx-auto">
        <div className="mb-[60px]">
          <ProductDetailCard
            ProductDetail={productDetail}
            reviews={1}
            userId={userId}
          />
        </div>
        <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
          상품 정보
        </h1>
        <div className="flex flex-col gap-[15px] pb-[60px] md:flex-row">
          <div className="w-full">
            <StatisticsCard
              status={'average'}
              conScore={productDetail?.rating}
            />
          </div>
          <div className="w-full">
            <StatisticsCard
              status={'steamed'}
              conScore={productDetail?.favoriteCount}
            />
          </div>
          <div className="w-full">
            <StatisticsCard
              status={'review'}
              conScore={productDetail?.reviewCount}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
            상품 리뷰
          </h1>
          <div className="w-[62px] md:w-[150px] xl:w-[160px]">
            <div className="flex w-full items-center justify-between">
              <select
                value={sort}
                onChange={handleChange}
                className="cursor-pointer appearance-none rounded-[6px] border-none bg-transparent text-[14px] font-normal text-white xl:text-[16px]"
              >
                <option value="recent">최신순</option>
                <option value="ratingDesc">평점 높은 순</option>
                <option value="ratingAsc">평점 낮은 순</option>
                <option value="likeCount">좋아요 순</option>
              </select>
              <Image src="/arrow.svg" alt="정렬" width={8} height={4} />
            </div>
          </div>
        </div>
        {productDetailReview?.list.length > 0 ? (
          <div className="mb-[15px]">
            {productDetailReview?.list.map((review) => (
              <ProductDetailReview
                key={review.id}
                review={review}
                order={sort}
              />
            ))}
          </div>
        ) : (
          <div className="mb-[120px] mt-[80px] flex flex-col items-center gap-[20px]">
            <div className="relative h-[32px] w-[39px] xl:h-[40px] xl:w-[49px]">
              <Image
                src={'/images/firstComment.svg'}
                alt={'첫번째 댓글을 달아보세요'}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-center text-lg font-normal leading-normal text-[#6E6E82]">
              첫 리뷰를 작성해 보세요
            </p>
          </div>
        )}
      </div>
    </>
  );
}
