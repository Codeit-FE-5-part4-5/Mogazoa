import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { dehydrate } from '@tanstack/react-query';
import queryClient from '@/lib/query';

import useGetMe from '@/models/queries/auth/useGetMe';
import useGetProductDetail from '@/models/queries/product/useGetProductDetail';
import useGetProductDetailReviews from '@/models/queries/reviews/useGetProductReview';
import productDetailService from '@/models/services/product/productDetailService';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import ProductDetailCard from '@/components/feature/product/ProductDetailCard/ProductDetailCard';
import ProductDetailReview from '@/components/feature/product/ProductDetailReview/ProductDetailReview';
import StatisticsCard from '@/components/feature/product/StatisticsCard/StatisticsCard';
import { DropDown } from '@/components/shared';
import { REVIEW_ORDER_LIST, REVIEW_SORT_ORDER } from '@/constants/review';

type TSortOrder = (typeof REVIEW_SORT_ORDER)[keyof typeof REVIEW_SORT_ORDER];

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { productId } = context.params!;

  await queryClient.prefetchQuery(
    productDetailService.queryOptions(Number(productId)),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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

  const [sort, setSort] = useState<TSortOrder>('recent');

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

  const handleOrderClick = (item: keyof typeof REVIEW_SORT_ORDER) => {
    const order = REVIEW_SORT_ORDER[item] as TSortOrder;
    setSort(order);
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
          <div className="w-[132px]">
            <DropDown
              isOrder
              itemList={REVIEW_ORDER_LIST}
              onClick={handleOrderClick}
            />
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
    </MogazoaLayout>
  );
};

export default ProductDetails;
