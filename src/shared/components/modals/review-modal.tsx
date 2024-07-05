/**TODO:
 * 1. textarea 에서 리뷰가 길어질 때 글자수 계산하는 부분을 침범하는 버그 수정
 */

import { ChangeEvent, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/shared/hooks/use-modal-store';

export const ReviewModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'review';

  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="w-[500px] bg-[#1c1c22] text-var-white">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            {/* 상품명 */}
            <div>Sony WH-1000XM3</div>
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
                />
              </div>
            </div>
            <div className="relative flex flex-col">
              <textarea
                className="min-h-[120px] resize-none rounded-md border border-[#353542] bg-[#252530] p-5"
                placeholder="리뷰를 작성해 주세요"
                value={text}
                onChange={handleChange}
              />
              <div className="absolute bottom-5 right-5">
                {text.length} / 500
              </div>
            </div>
            {/* 사진 input */}
            <div className="mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white">
              작성하기
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
