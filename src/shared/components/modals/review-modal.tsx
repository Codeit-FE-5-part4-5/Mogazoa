import { useState } from 'react';
import apiInstance from '@/shared/utils/axios';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/shared/hooks/use-modal-store';
import Button from '../Button/Button';
import TextAreaInput from '../Input/TextAreaInput';
import ImageInput from '../Input/ImageInput';
import Chip from '../Chip/Chip';
import Image from 'next/image';

export const ReviewModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'review';

  const [rating, setRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const productId = usePathname().split('/').pop();

  const [review, setReview] = useState<string>('');
  const [image, setImage] = useState('');
  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  const handleSave = async () => {
    const requestBody = {
      productId: productId,
      images: image,
      content: review,
      rating: rating,
    };

    try {
      const response = await apiInstance.post('/reviews', requestBody);
      console.log('Response:', response.data);
      router.push('/mypage');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorDetails = error.response.data.details;
        console.log('Error:', errorDetails);
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="mb-10 self-start text-2xl">
            <div className="w-[58px]">
              {/* <Chip text="전자기기" color="#23B581" /> */}
            </div>
            <div className="mt-[10px] self-start">Sony WH-1000XM3</div>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="flex items-center gap-x-5">
              <div className="text-base">별점</div>
              <div>
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
                  SVGclassName={`inline-block`}
                  fillIcon={
                    <Image
                      className="mr-[2px] inline-block xl:mr-[5px]"
                      src="images/star.svgs"
                      alt="star"
                      width={32}
                      height={32}
                    />
                  }
                  emptyIcon={
                    <Image
                      className="mr-[2px] inline-block xl:mr-[5px]"
                      src="images/empty-star.svg"
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
                value={review} // Add this line
                textLength={300}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setReview(e.target.value)
                }
              />
            </div>
            <div className="flex space-x-4">
              <div className="h-[140px] w-[140px] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]">
                <ImageInput
                  onChange={(image: string | null) => setImage(image || '')}
                />
              </div>
            </div>
            <Button text="작성하기" onClick={handleSave} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
