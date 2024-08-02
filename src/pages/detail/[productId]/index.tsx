import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useModal from '@/store/use-modal-store';
import useGetMe from '@/models/auth/useGetMe';
import useGetProductDetail from '@/models/product/useGetProductDetail';
import useGetProductDetailReviews from '@/models/reviews/useGetProductReview';

import ProductDetailCard from '@/components/feature/product/ProductDetailCard/ProductDetailCard';
import ProductDetailReview from '@/components/feature/product/ProductDetailReview/ProductDetailReview';
import StatisticsCard from '@/components/feature/product/StatisticsCard/StatisticsCard';
import Floating from '@/components/shared/Floating/Floating';
import MogazoaLayout from '@/components/layout/App/MogazoaLayout';

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: me } = useGetMe();
  const userId = me?.id;
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (me) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [me]);

  const { data: productDetail } = useGetProductDetail({
    productId: Number(productId),
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [sort, setSort] = useState<
    'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount'
  >('recent');

  const numericProductId =
    productId && !Array.isArray(productId) ? Number(productId) : undefined;

  const {
    data: productDetailReview,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProductDetailReviews({ productId: numericProductId, order: sort });

  const reviews = productDetailReview?.pages.flatMap((page) => page.list) || [];
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (
    value: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount',
    label: '최신순' | '평점 높은 순' | '평점 낮은 순' | '좋아요 순',
  ) => {
    setSort(value);
    setSelectedOption(label);
    setIsDropdownOpen(false);
  };

  const { onOpen } = useModal();

  const handleReviewEdit = () => {
    if (isLogin) {
      onOpen('review');
    } else {
      onOpen('login');
    }
  };

  if (!productDetail) {
    return null;
  }

  return (
    <MogazoaLayout>
      <div className="px-[20px] xl:container md:px-[30px] md:pt-[20px] xl:mx-auto">
        <div className="mb-[60px]">
          <ProductDetailCard
            ProductDetailData={productDetail}
            userId={userId}
            isLogin={isLogin}
          />
        </div>
        <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
          상품 정보
        </h1>
        <div className="flex flex-col gap-[15px] pb-[60px] md:flex-row">
          <div className="w-full">
            <StatisticsCard
              status="average"
              conScore={productDetail?.rating}
              scoreDiff={productDetail?.categoryMetric.rating}
            />
          </div>
          <div className="w-full">
            <StatisticsCard
              status="steamed"
              conScore={productDetail?.favoriteCount}
              scoreDiff={productDetail?.categoryMetric.favoriteCount}
            />
          </div>
          <div className="w-full">
            <StatisticsCard
              status="review"
              conScore={productDetail?.reviewCount}
              scoreDiff={productDetail?.categoryMetric.reviewCount}
            />
          </div>
        </div>
        <div className="flex items-center justify-between pb-[30px]">
          <h1 className="text-[18px] font-semibold leading-normal text-[#F1F1F5]">
            상품 리뷰
          </h1>
          <div>
            <div className="flex w-full items-center justify-between">
              <div className="relative inline-block">
                <div
                  className="w-[120px] cursor-pointer appearance-none rounded-md border-2 border-none bg-transparent text-center text-[16px] font-normal text-white focus:outline-none"
                  onClick={handleDropdownToggle}
                >
                  {selectedOption}
                  <Image
                    src="/arrow.svg"
                    alt="정렬"
                    width={8}
                    height={4}
                    className="ml-2 inline-block"
                  />
                </div>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full rounded-md border border-var-gray1 bg-[#1c1c22] text-var-gray1">
                    <div
                      className="cursor-pointer p-3 hover:text-var-white"
                      onClick={() => handleOptionSelect('recent', '최신순')}
                    >
                      최신순
                    </div>
                    <div
                      className="cursor-pointer p-3 hover:text-var-white"
                      onClick={() =>
                        handleOptionSelect('ratingDesc', '평점 높은 순')
                      }
                    >
                      평점 높은 순
                    </div>
                    <div
                      className="cursor-pointer p-3 hover:text-var-white"
                      onClick={() =>
                        handleOptionSelect('ratingAsc', '평점 낮은 순')
                      }
                    >
                      평점 낮은 순
                    </div>
                    <div
                      className="cursor-pointer p-3 hover:text-var-white"
                      onClick={() =>
                        handleOptionSelect('likeCount', '좋아요 순')
                      }
                    >
                      좋아요 순
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {reviews.length > 0 ? (
          <div className="mb-[15px]">
            {reviews.map((review) => (
              <ProductDetailReview
                key={review.id}
                review={review}
                order={sort}
                userId={userId}
                productName={productDetail?.name}
                isLogin={isLogin}
              />
            ))}
            <div ref={ref} />
            {isFetchingNextPage && <div>Loading more reviews...</div>}
          </div>
        ) : (
          <div className="mb-[120px] mt-[80px] flex flex-col items-center gap-[20px]">
            <div className="relative h-[32px] w-[39px] xl:h-[40px] xl:w-[49px]">
              <Image
                src="/images/firstComment.svg"
                alt="첫번째 댓글을 달아보세요"
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
      <div
        className="fixed"
        style={{ bottom: '10%', right: '10%' }}
        onClick={handleReviewEdit}
      >
        <Floating />
      </div>
    </MogazoaLayout>
  );
};

export default ProductDetails;
