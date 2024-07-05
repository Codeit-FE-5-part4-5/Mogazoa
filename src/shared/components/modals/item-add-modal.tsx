import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/shared/hooks/use-modal-store';
import Image from 'next/image';
import { ModalDropdown } from './modal-dropdown/modal-dropdown';
import { ChangeEvent, useState } from 'react';

export const ItemAddModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'itemAdd';
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="w-[500px] bg-[#1c1c22] text-var-white">
        <DialogHeader>
          <DialogTitle className="mb-10 self-start text-2xl">
            상품 추가
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            {/* 모바일 화면에서 세로로 배치 */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="md:order-2">
                {/* Image Input 컴포넌트 추가 */}
                <Image
                  src="/images/file.svg"
                  width={160}
                  height={160}
                  alt="file"
                />
              </div>
              <div className="md:order-1">
                {/* Dropdown 컴포넌트 추가 */}
                <ModalDropdown />
                <ModalDropdown />
              </div>
            </div>

            {/* 텍스트 에디터 및 저장하기 버튼 */}
            <div className="flex flex-col items-end rounded-md bg-[#252530]">
              <textarea
                className="h-full w-full resize-none rounded-md bg-[#252530] p-5 text-var-white outline-none"
                placeholder="상품을 추가해 주세요."
                value={text}
                maxLength={500}
                onChange={handleTextChange}
              />
              <div className="mb-5 mr-5">{text.length} / 500</div>
            </div>
            <div className="mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white">
              추가하기
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
