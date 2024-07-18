import Image from 'next/image';
import ThumbsChip from '../Chip/ThumbsChip';
import { Review } from '@/shared/types/reviews/reviews';
import Link from 'next/link';
import { useState } from 'react';
import { useModal } from '@/shared/store/use-modal-store';
import { ReviewDeleteModal } from '../modals/review-delete-modal';
import { ReviewEditModal } from '@/shared/components/modals/review-edit-modal';

interface Props {
  review: Review;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
  userId: number;
  productName: string;
}

const ProductDetailReview = ({ review, order, userId, productName }: Props) => {
  const { onOpen } = useModal();
  const reviewUserId = review.userId;

  const formattedDate = new Date(review?.createdAt).toLocaleDateString(
    'ko-KR',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
  );

  const handleEditClick = () => {
    onOpen('reviewEdit', { reviewId: review.id });
  };

  const handleDeleteClick = () => {
    onOpen('reviewDelete', { reviewId: review.id });
  };

  const a = () => {
    console.log(review.id);
  };
  return (
    <>
      <ReviewEditModal
        productId={review?.productId}
        order={order}
        productName={productName}
        initialRating={review?.rating}
        initialImages={review?.reviewImages}
        initialReviewContent={review?.content}
      />
      <ReviewDeleteModal productId={review?.productId} order={order} />
      <div className="mb-[15px] justify-between rounded-[12px] border border-[#353542] bg-[#252530] px-[20px] py-[20px] md:flex md:gap-[30px] md:py-[20px] xl:mb-[20px] xl:gap-[70px] xl:rounded-[12px] xl:px-[20px] xl:py-[25px]">
        <Link href={`/user/${reviewUserId}`}>
          <div className="mb-[20px] flex gap-[10px] md:min-w-[160px]">
            <div className="flex h-[36px] w-[36px] overflow-hidden rounded-full bg-blue-50 md:h-[42px] md:w-[42px]">
              <img src={review?.user.image} alt="profileImg" />
            </div>
            <div>
              <div className="font-Pretendard mb-[5px] font-normal text-white xl:text-[16px]">
                {review?.user.nickname}
              </div>
              <div className="flex gap-[3px]">
                {Array(review?.rating)
                  .fill('')
                  .map((_, index) => {
                    return (
                      <img
                        key={index}
                        src="/images/star.svg"
                        alt={`star-${index}`}
                        className="h-[10px] xl:h-[16px]"
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </Link>
        <div className="w-full" onClick={a}>
          {/* <div className="text-gradient mb-[10px] text-[10px] font-normal">
          지원받고 남기는 리뷰입니다.
        </div> */}
          <div className="text-[12px] font-normal leading-[16px] text-var-white xl:text-[16px] xl:leading-[22px]">
            {review?.content}
          </div>
          <ul className="mt-[20px] w-full gap-[10px] xl:grid-cols-6 xl:gap-[20px]">
            {review?.reviewImages.map((image) => (
              <li
                key={image.id}
                className="relative h-[60px] w-[60px] md:h-[80px] md:w-[80px] xl:h-[100px] xl:w-[100px]"
              >
                <Image
                  src={image.source}
                  alt={`리뷰 이미지 ${image.id}`}
                  fill
                />
              </li>
            ))}
          </ul>
          <div className="mt-[16px] flex items-end justify-between">
            <div className="flex gap-[15px]">
              <div className="text-[12px] font-normal text-var-gray1">
                {formattedDate}
              </div>
              {userId === reviewUserId ? (
                <div className="flex gap-[10px] text-[12px] text-var-gray2 xl:text-[14px]">
                  <button className="underline" onClick={handleEditClick}>
                    수정
                  </button>
                  <button className="underline" onClick={handleDeleteClick}>
                    삭제
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <ThumbsChip
                count={review?.likeCount}
                isLikedByMe={review?.isLiked}
                reviewId={review?.id}
                productId={review?.productId}
                order={order}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailReview;
