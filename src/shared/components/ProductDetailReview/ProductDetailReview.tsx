import reviewImg1 from '@/assets/review_image.png';
import Image from 'next/image';
import ThumbsChip from '../Chip/ThumbsChip';
import { ReviewDetail } from '@/shared/types/reviews/reviews';

interface Props {
  review: ReviewDetail;
}

const ProductDetailReview = ({ review }: Props) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  console.log(review);
  return (
    <div className="mb-[15px] justify-between rounded-[12px] border border-[#353542] bg-[#252530] px-[20px] py-[20px] md:flex md:gap-[30px] md:py-[20px] xl:mb-[20px] xl:gap-[70px] xl:rounded-[12px] xl:px-[20px] xl:py-[25px]">
      <div className="mb-[20px] flex gap-[10px] md:min-w-[160px]">
        <div className="flex h-[36px] w-[36px] overflow-hidden rounded-full bg-blue-50 md:h-[42px] md:w-[42px]">
          {/* <Image src={review.user.image} alt="profileImg" layout="intrinsic" /> */}
        </div>
        <div>
          <div className="mb-[5px] text-[14px] font-normal text-var-white xl:text-[16px]">
            q
          </div>
          <div className="flex gap-[3px]">
            {Array(review.rating)
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
      <div className="w-full">
        {/* <div className="text-gradient mb-[10px] text-[10px] font-normal">
          지원받고 남기는 리뷰입니다.
        </div> */}
        <div className="text-[12px] font-normal leading-[16px] text-var-white xl:text-[16px] xl:leading-[22px]">
          {review.content}
        </div>
        <ul className="mt-[20px] w-full gap-[10px] xl:grid-cols-6 xl:gap-[20px]">
          {review.reviewImages.map((image) => (
            <li
              key={image.id}
              className="relative h-[60px] w-[60px] md:h-[80px] md:w-[80px] xl:h-[100px] xl:w-[100px]"
            >
              <Image src={image.source} alt={`리뷰 이미지 ${image.id}`} fill />
            </li>
          ))}
        </ul>
        <div className="mt-[16px] flex items-end justify-between">
          <div className="flex gap-[15px]">
            <div className="text-[12px] font-normal text-var-gray1">
              {formattedDate}
            </div>
            {/* <div className="flex gap-[10px] text-[12px] text-var-gray2 xl:text-[14px]">
              <button className="underline">수정</button>
              <button className="underline">삭제</button>
            </div> */}
          </div>
          <div>
            {/* <ThumbsChip
              count={review.likeCount}
              isLikedByMe={review.isLiked}
              setLikedByMe={setLikedByMe}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailReview;
