import ProductDetailCard from '@/shared/components/ProductDetailCard/ProductDetailCard';
import ProductDetailReview from '@/shared/components/ProductDetailReview/ProductDetailReview';
import StatisticsCard from '@/shared/components/StatisticsCard/StatisticsCard';
import { Header } from '@/shared/components/header/header';
import useGetProductDetail from '@/shared/models/product/useGetProductDetail';
import useGetProductDetailReviews from '../../../shared/models/reviews/useGetProductReview';
import { useRouter } from 'next/router';
import useGetMe from '@/shared/models/auth/useGetMe';
import { getCookie } from '@/shared/utils/cookie';

export default function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query;

  const token = getCookie('accessToken');

  const { data: me } = useGetMe(token);
  const userId = me?.data.id;

  const { data: productDetail } = useGetProductDetail({
    productId: Number(productId),
  });

  const { data: productDetailReview } = useGetProductDetailReviews({
    productId: Number(productId),
  });

  return (
    <>
      <Header />
      <div className="px-[20px] xl:container md:px-[30px] md:pt-[20px] xl:mx-auto">
        <div className="mb-[60px]">
          <ProductDetailCard
            name={productDetail?.name}
            reviews={1}
            description={productDetail?.description}
            text={productDetail?.category?.name}
            color={'#ffffff'}
            image={productDetail?.image}
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
        {productDetailReview?.list.length > 0 ? (
          <div className="">
            <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
              상품 리뷰
            </h1>
            <div className="mb-[15px]">
              {productDetailReview?.list.map((review) => (
                <ProductDetailReview key={review.id} review={review} />
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden">
            <h1 className="font-pretendard pb-[30px] text-[18px] font-semibold leading-normal text-[#F1F1F5]">
              상품 리뷰
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
