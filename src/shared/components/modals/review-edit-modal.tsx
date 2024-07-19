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
import useEditReview from '@/shared/models/reviews/useEditReview';

interface EditImage {
  id?: number | null;
  source?: string | null;
}

interface Props {
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
  productName: string;
}

export const ReviewEditModal = ({ order, productId, productName }: Props) => {
  const { isOpen, onClose, type, data } = useModal();
  const { reviewId, initialRating, initialReviewContent, initialImages } = data;

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [images, setImages] = useState<EditImage[]>(initialImages || []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }

    if (initialReviewContent) {
      setReview(initialReviewContent);
    }

    if (initialImages && initialImages?.length > 0) {
      setImages(initialImages);
    } else {
      setImages([]);
    }
  }, [initialRating, initialReviewContent, initialImages]);

  const EditReviewMutation = useEditReview({
    reviewId,
    productId,
    order,
    updatedReview: { rating, content: review, images },
  });

  const handleEditReview = async () => {
    if (!validateForm()) return;

    try {
      await EditReviewMutation.mutateAsync();
      onClose();
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
    }
  };

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

  const handleImageChange = (index: number, image: string | null) => {
    const newImages = [...images];

    if (image === null) {
      newImages.splice(index, 1);
    } else {
      newImages[index] = { source: image };
    }

    if (newImages.length < 3) {
      newImages.push({ source: null });
    }

    setImages(newImages);
  };

  return (
    <Dialog open={isOpen && type === 'reviewEdit'} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">{productName}</DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="flex items-center gap-x-5">
              <div className="text-base">별점</div>
              <div>
                <Rating
                  onClick={handleRating}
                  initialValue={rating}
                  SVGclassName={`inline-block`}
                  fillIcon={
                    <Image
                      className="mr-[2px] inline-block"
                      src="/images/star.svg"
                      alt="star"
                      width={32}
                      height={32}
                    />
                  }
                  emptyIcon={
                    <Image
                      className="mr-[2px] inline-block"
                      src="/images/empty-star.svg"
                      alt="empty-star"
                      width={32}
                      height={32}
                    />
                  }
                />
              </div>
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
              {images.length === 0 ? (
                <div className="h-[140px] w-[140px] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]">
                  <ImageInput
                    initialImageUrl={null}
                    onChange={(newImage: string | null) =>
                      handleImageChange(0, newImage)
                    }
                  />
                </div>
              ) : (
                images.map((image, index) => (
                  <div
                    key={index}
                    className="h-[140px] w-[140px] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]"
                  >
                    <ImageInput
                      initialImageUrl={image.source || null}
                      onChange={(newImage: string | null) =>
                        handleImageChange(index, newImage)
                      }
                    />
                  </div>
                ))
              )}
            </div>
            <Button text="편집하기" onClick={handleEditReview} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
