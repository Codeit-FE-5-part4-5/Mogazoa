/**TODO:
 * 1. chip 컴포넌트 추가
 * 2. 상품명 api 받아와서 추가
 * 3. image input 컴포넌트 추가
 */

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

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

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="w-[500px] bg-[#1c1c22] text-var-white">
        <DialogHeader>
          <DialogTitle className="mb-10 self-start text-2xl">
            {/* chip */}
            {/* 상품명 */}
            <div className="self-start">Sony WH-1000XM3</div>
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
            <div className="flex flex-col items-end rounded-md bg-[#252530]">
              <textarea
                className="h-full w-full resize-none rounded-md bg-[#252530] p-5 text-var-white outline-none"
                placeholder="리뷰를 작성해 주세요"
                value={text}
                maxLength={500}
                onChange={handleTextChange}
              />
              <div className="mb-5 mr-5">{text.length} / 500</div>
            </div>
            {/* Image Input 컴포넌트 추가 */}
            <Image src="/images/file.svg" width={160} height={160} alt="file" />
            <div className="mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white">
              작성하기
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
