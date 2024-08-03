import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import apiInstance from '@/lib/axios';
import useModal from '@/store/use-modal-store';

import useGetProductDetail from '@/models/queries/product/useGetProductDetail';
import Button from '../Button/Button';
import TextAreaInput from '../Input/TextAreaInput';
import ImageInput from '../Input/ImageInput';
// import Image from 'next/image';

const ReviewModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const { productId } = router.query;
  const isModalOpen = isOpen && type === 'review';

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [image3, setImage3] = useState<string | null>(null);
  const images = [image1, image2, image3].filter(
    (image) => image !== null,
  ) as string[];
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const requestBody = {
      productId,
      images,
      content: review,
      rating,
    };

    try {
      await apiInstance.post('/reviews', requestBody);
      onClose();
      router.push(`/detail/${productId}`);
      router.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorDetails = error.response.data.details;
        setErrorMessage(errorDetails);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const { data: productDetail } = useGetProductDetail({
    productId: Number(productId),
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="mb-10 self-start text-2xl">
            <div className="w-[58px]">
              {/* <Chip text="전자기기" color="#23B581" /> */}
            </div>
            <div className="mt-[10px] self-start">{productDetail?.name}</div>
          </DialogTitle>
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
              <div className="flex h-[140px] w-fit gap-5 md:h-[135px] xl:h-[160px]">
                <div className="h-[140px] w-[140px] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]">
                  <ImageInput
                    onChange={(image: string | null) => setImage1(image)}
                  />
                </div>
                {image1 && (
                  <div className="md:h/[135px] md:w/[135px] xl:h/[160px] xl:w/[160px] flex h-[140px] w-[140px]">
                    <ImageInput
                      onChange={(image: string | null) => setImage2(image)}
                    />
                  </div>
                )}
                {image2 && (
                  <div className="md:h/[135px] md:w/[135px] xl:h/[160px] xl:w/[160px] flex h-[140px] w-[140px]">
                    <ImageInput
                      onChange={(image: string | null) => setImage3(image)}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button
              text="작성하기"
              onClick={handleSave}
              isPending={isSubmitting}
              className={isSubmitting ? 'opacity-80' : ''}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
