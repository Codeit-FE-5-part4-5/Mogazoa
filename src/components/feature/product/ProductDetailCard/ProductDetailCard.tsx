import { useEffect } from 'react';
import Image from 'next/image';
import useModal from '@/store/use-modal-store';
import useFavoriteProduct from '@/models/product/useFavoriteProduct';
import { ProductDetail } from '@/types/product/productDetail';
import { Chip, Button, CompareModal } from '@/components/shared';

interface Props {
  ProductDetailData: ProductDetail;
  userId: number | null;
  isLogin: boolean;
}

const ProductDetailCard = ({
  ProductDetailData,
  userId = null,
  isLogin,
}: Props) => {
  const productId = ProductDetailData?.id;
  const { mutate } = useFavoriteProduct({ productId });
  const { onOpen } = useModal();

  const handleToggleFavorite = () => {
    if (isLogin) {
      mutate();
    } else {
      onOpen('login');
    }
  };

  const handleReviewButton = () => {
    if (isLogin) {
      onOpen('review');
    } else {
      onOpen('login');
    }
  };

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // eslint-disable-next-line no-alert
    alert(`현재 페이지 URL이 복사되었습니다`);
  };

  const handleKakaoShare = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: ProductDetailData?.name,
        description: ProductDetailData?.description,
        imageUrl: ProductDetailData?.image,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '제품 보러가기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleChangeButton = () => {
    if (isLogin) {
      const productIdData1 = localStorage.getItem('productIdData1');
      const productIdData2 = localStorage.getItem('productIdData2');

      if (!productIdData1) {
        localStorage.setItem(
          'productIdData1',
          JSON.stringify(ProductDetailData),
        );
        // eslint-disable-next-line no-alert
        alert('비교제품이 추가되었습니다.');
      } else if (productIdData1 && !productIdData2) {
        localStorage.setItem(
          'productIdData2',
          JSON.stringify(ProductDetailData),
        );
        onOpen('compareNotice');
      } else {
        const isSameAsProduct1 =
          productIdData1 &&
          JSON.parse(productIdData1).id === ProductDetailData.id;
        const isSameAsProduct2 =
          productIdData2 &&
          JSON.parse(productIdData2).id === ProductDetailData.id;

        if (isSameAsProduct1 || isSameAsProduct2) {
          onOpen('compareNotice');
        } else {
          onOpen('compare');
        }
      }
    } else {
      onOpen('login');
    }
  };

  return (
    <>
      <div className="gap-[50px] text-var-white md:flex">
        <div className="flex items-center justify-center">
          <div className="relative mb-5 h-[249px] w-[289px] md:m-0 md:h-full md:w-[280px] xl:w-[355px]">
            <Image
              className="rounded-lg"
              src={ProductDetailData?.image}
              alt="리뷰이미지"
              layout="fill"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 items-center">
            <div className="md:order-1 md:col-span-2">
              <Chip
                text={ProductDetailData?.category.name}
                color="#ffffff"
                size="s"
              />
            </div>
            <ul className="flex justify-end gap-[10px] md:order-3">
              <li>
                <button
                  type="button"
                  className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[6px] bg-[#252530] xl:h-[28px] xl:w-[28px]"
                  onClick={handleKakaoShare}
                >
                  <Image
                    src="/images/kakaotalk.svg"
                    alt="카카오 공유"
                    className="h-[14px] xl:h-[18px]"
                    width={18}
                    height={18}
                  />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[6px] bg-[#252530] xl:h-[28px] xl:w-[28px]"
                  onClick={handleCopyUrl}
                >
                  <Image
                    src="/images/share_300.svg"
                    alt="공유하기"
                    className="h-[14px] xl:h-[18px]"
                    width={18}
                    height={18}
                  />
                </button>
              </li>
            </ul>

            <div className="col-span-2 flex items-center justify-between md:order-2 md:col-span-1 md:justify-normal md:gap-[15px]">
              <h3 className="my-[10px] text-[20px] xl:text-[24px]">
                {ProductDetailData?.name}
              </h3>
              <button type="button" onClick={handleToggleFavorite}>
                <Image
                  src={
                    ProductDetailData?.isFavorite
                      ? '/images/save_300.svg'
                      : '/images/unsave_300.svg'
                  }
                  alt={ProductDetailData?.isFavorite ? '찜풀기' : '찜하기'}
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div className="mt-[20px] text-[14px] leading-[20px] xl:text-[16px] xl:leading-[22px]">
            {ProductDetailData?.description}
          </div>
          {userId === ProductDetailData?.writerId ? (
            <div className="mt-[40px] flex flex-col gap-[15px] md:mt-[60px] md:flex-row xl:gap-[20px]">
              <Button text="리뷰 작성하기" onClick={() => onOpen('review')} />
              <Button
                text="비교하기"
                variant="secondary"
                onClick={handleChangeButton}
              />
              <Button
                text="편집하기"
                variant="secondary"
                onClick={() => onOpen('itemEdit')}
              />
            </div>
          ) : (
            <div className="mt-[40px] flex flex-col gap-[15px] md:mt-[60px] md:flex-row xl:gap-[20px]">
              <Button text="리뷰 작성하기" onClick={handleReviewButton} />
              <Button
                text="비교하기"
                variant="secondary"
                onClick={handleChangeButton}
              />
            </div>
          )}
        </div>
      </div>
      <CompareModal ProductDetailData={ProductDetailData} />
    </>
  );
};

export default ProductDetailCard;
