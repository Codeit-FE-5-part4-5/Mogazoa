import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Rating } from 'react-simple-star-rating';
import { useModal } from '@/shared/store/use-modal-store';
import Button from '../Button/Button';
import TextAreaInput from '../Input/TextAreaInput';
import ImageInput from '../Input/ImageInput';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ReviewImage } from '@/shared/types/reviews/reviews';

interface Props {
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
  productName: string;
  initialRating: number;
  initialReviewContent: string;
  initialImages: ReviewImage[];
}

export const ReviewEditModal = ({
  order,
  productId,
  productName,
  initialRating,
  initialReviewContent,
  initialImages,
}: Props) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [review, setReview] = useState<string>(initialReviewContent);
  const [images, setImages] = useState<ReviewImage[]>(initialImages);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { isOpen, onClose, type, data } = useModal();

  const reviewId = data?.reviewId;

  const isModalOpen = isOpen && type === 'reviewEdit';

  useEffect(() => {
    setRating(initialRating);
    setReview(initialReviewContent);
    setImages(initialImages);
  }, [isModalOpen, initialRating, initialReviewContent, initialImages]);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const validateForm = () => {
    if (!review) {
      setErrorMessage('리뷰 내용을 입력해주세요.');
      return false;
    }
    if (review.length < 10) {
      setErrorMessage('최소 10자 이상 적어주세요.');
      return false;
    }
    if (rating === 0) {
      setErrorMessage('별점으로 상품을 평가해주세요.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            <div className="w-[58px]">
              {/* <Chip text="전자기기" color="#23B581" /> */}
            </div>
            <div className="mt-[10px] self-start">{productName}</div>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="flex items-center gap-x-5">
              <div className="text-base">별점</div>
              {/* <div>
                <Rating
                  onClick={handleRating}
                  ratingValue={rating}
                  size={32}
                  transition
                  fillColor="#23B581"
                  emptyColor="#6E6E82"
                  className="cursor-pointer"
                />
              </div> */}
            </div>
            <div className="flex h-[120px] flex-col items-end rounded-md bg-[#252530] md:h-[160px]">
              <TextAreaInput
                placeholder="리뷰를 작성해 주세요."
                value={review}
                textLength={300}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setReview(e.target.value)
                }
              />
            </div>
            {errorMessage && (
              <div className="mb-5 text-red-500">{errorMessage}</div>
            )}
            <div className="flex space-x-4">
              <div className="h-[140px] w-[140px] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]">
                {/* <ImageInput
                  value={images[0] || null}
                  onChange={(image: string | null) =>
                    setImages([image, images[1], images[2]])
                  }
                />
                {images[0] && (
                  <ImageInput
                    value={images[1] || null}
                    onChange={(image: string | null) =>
                      setImages([images[0], image, images[2]])
                    }
                  />
                )}
                {images[1] && (
                  <ImageInput
                    value={images[2] || null}
                    onChange={(image: string | null) =>
                      setImages([images[0], images[1], image])
                    }
                  />
                )} */}
              </div>
            </div>
            <Button text="편집하기" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
