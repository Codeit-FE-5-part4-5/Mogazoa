import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import Image from 'next/image';
import useFavoriteProduct from '@/shared/models/product/useFavoriteProduct';
import { ProductDetail } from '@/shared/types/product/productDetail';
import { useModal } from '@/shared/store/use-modal-store';
import { CompareModal } from '../modals/compare-modal';

interface Props {
  ProductDetail: ProductDetail;
  reviews: number;
  userId: number | null;
  isLogin: boolean;
}

const ProductDetailCard = ({
  ProductDetail,
  reviews,
  userId = null,
  isLogin,
}: Props) => {
  const productId = ProductDetail?.id;
  const { mutate } = useFavoriteProduct({ productId });

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

  const { onOpen } = useModal();
  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert(`현재 페이지 URL이 복사되었습니다`);
  };

  const handleKakaoShare = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: ProductDetail?.name,
        description: ProductDetail?.description,
        imageUrl: ProductDetail?.image,
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
        localStorage.setItem('productIdData1', JSON.stringify(ProductDetail));
        alert('비교제품이 추가되었습니다.');
      } else if (productIdData1 && !productIdData2) {
        localStorage.setItem('productIdData2', JSON.stringify(ProductDetail));
        onOpen('compareNotice');
      } else {
        const isSameAsProduct1 =
          productIdData1 && JSON.parse(productIdData1).id === ProductDetail.id;
        const isSameAsProduct2 =
          productIdData2 && JSON.parse(productIdData2).id === ProductDetail.id;

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
              src={ProductDetail?.image}
              alt="리뷰이미지"
              layout="fill"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 items-center">
            <div className="md:order-1 md:col-span-2">
              <Chip
                text={ProductDetail?.category.name}
                color={'#ffffff'}
                size={'s'}
              />
            </div>
            <ul className="flex justify-end gap-[10px] md:order-3">
              <li
                className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[6px] bg-[#252530] xl:h-[28px] xl:w-[28px]"
                onClick={handleKakaoShare}
              >
                <img
                  src="/images/kakaotalk.svg"
                  alt="카카오 공유"
                  className="h-[14px] xl:h-[18px]"
                />
              </li>
              <li
                className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[6px] bg-[#252530] xl:h-[28px] xl:w-[28px]"
                onClick={handleCopyUrl}
              >
                <img
                  src="/images/share_300.svg"
                  alt="공유하기"
                  className="h-[14px] xl:h-[18px]"
                />
              </li>
            </ul>
            <div className="col-span-2 flex items-center justify-between md:order-2 md:col-span-1 md:justify-normal md:gap-[15px]">
              <h3 className="my-[10px] text-[20px] xl:text-[24px]">
                {ProductDetail?.name}
              </h3>
              <button onClick={handleToggleFavorite}>
                <img
                  src={
                    ProductDetail?.isFavorite
                      ? '/images/save_300.svg'
                      : '/images/unsave_300.svg'
                  }
                  alt={ProductDetail?.isFavorite ? '찜풀기' : '찜하기'}
                />
              </button>
            </div>
          </div>
          <div className="mt-[20px] text-[14px] leading-[20px] xl:text-[16px] xl:leading-[22px]">
            {ProductDetail?.description}
          </div>
          {userId === ProductDetail?.writerId ? (
            <div className="mt-[40px] flex flex-col gap-[15px] md:mt-[60px] md:flex-row xl:gap-[20px]">
              <Button text="리뷰 작성하기" onClick={() => onOpen('review')} />
              <Button
                text="비교하기"
                variant="secondary"
                onClick={handleChangeButton}
              />
              <Button
                text="편집하기"
                variant="tertiary"
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
      <CompareModal productDetail={ProductDetail} />
    </>
  );
};

export default ProductDetailCard;
