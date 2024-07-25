import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import useModal from '@/shared/store/use-modal-store';
import Button from '../Button/Button';
import TextAreaInput from '../Input/TextAreaInput';
import ImageInput from '../Input/ImageInput';
import useEditReview from '../../models/reviews/useEditReview';

interface EditImage {
  id?: number | null;
  source?: string | null;
}

interface Props {
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
  productName: string;
}

const ReviewEditModal = ({ order, productId, productName }: Props) => {
  const { isOpen, onClose, type, data } = useModal();
  const { reviewId, initialRating, initialReviewContent, initialImages } = data;

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [images, setImages] = useState<EditImage[]>(initialImages || []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [mutateError, setMutateError] = useState<string | null>(null);

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }

    if (initialReviewContent) {
      setReview(initialReviewContent);
    }

    setImages(
      initialImages && initialImages.length > 0
        ? initialImages
        : [{ source: null }],
    );
  }, [initialRating, initialReviewContent, initialImages]);

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
    } else if (index < newImages.length) {
      newImages[index] = { source: image };
    } else {
      newImages.push({ source: image });
    }

    // 빈 이미지 슬롯 추가
    if (newImages.length < 3 && newImages.every((img) => img.source !== null)) {
      newImages.push({ source: null });
    }

    if (newImages.length === 0) {
      newImages.push({ source: null });
    }

    setImages(newImages);
  };

  const formatImagesForServer = () => {
    return images
      .filter((img) => img.source !== null)
      .map((img) => (img.id ? { id: img.id } : { source: img.source }));
  };

  const EditReviewMutation = useEditReview({
    reviewId,
    productId,
    order,
    updatedReview: { rating, content: review, images: formatImagesForServer() },
  });

  const handleEditReview = async () => {
    if (!validateForm()) return;

    setIsPending(true);
    try {
      await EditReviewMutation.mutateAsync();
      onClose();
    } catch (error) {
      setMutateError('리뷰 수정에 실패하였습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen && type === 'reviewEdit'} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:w-[490px] xl:w-[560px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">{productName}</DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="flex items-center gap-x-5">
              <div className="text-base">별점</div>
              <div>
                <Rating
                  onClick={handleRating}
                  initialValue={rating}
                  SVGclassName="inline-block"
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
              {images.map((image, index) => (
                <div
                  key={image.id ?? index}
                  className="h-[140px] w-[140px] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]"
                >
                  <ImageInput
                    initialImageUrl={image.source || null}
                    onChange={(newImage: string | null) =>
                      handleImageChange(index, newImage)
                    }
                  />
                </div>
              ))}
              {images.length < 3 &&
                images.every((img) => img.source !== null) && (
                  <div className="h-[140px] w-[140px] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]">
                    <ImageInput
                      initialImageUrl={null}
                      onChange={(newImage: string | null) =>
                        handleImageChange(images.length, newImage)
                      }
                    />
                  </div>
                )}
            </div>

            {mutateError && <p className="text-red-500">{mutateError}</p>}
            <Button
              className={isPending ? 'opacity-80' : ''}
              text="편집하기"
              onClick={handleEditReview}
              disabled={isPending}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewEditModal;
