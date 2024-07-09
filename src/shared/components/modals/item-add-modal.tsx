import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/shared/hooks/use-modal-store';
import DropDown from '../DropDown/DropDown';
import ImageInput from '../Input/ImageInput';
import TextAreaInput from '../Input/TextAreaInput';
import Button from '../Button/Button';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export const ItemAddModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'itemAdd';

  const [selecteItem, setSelecteItem] = useState('');

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="mb-10 self-start text-2xl">
            상품 추가
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="flex flex-col gap-x-5 md:flex-row md:items-start">
              <div className="h-[140px] w-[140px] md:order-2 md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]">
                <div className="h-[140px] w-[140px] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]">
                  <ImageInput />
                </div>
              </div>
              <div className="mt-[10px] w-full md:order-1 md:mt-0">
                <div className="flex flex-col gap-y-5">
                  <DropDown itemList={frameworks} onClick={setSelecteItem} />
                  <DropDown itemList={frameworks} onClick={setSelecteItem} />
                </div>
              </div>
            </div>
            <div className="flex h-[120px] flex-col items-end rounded-md bg-[#252530] md:h-[160px]">
              <TextAreaInput placeholder="리뷰를 작성해 주세요." />
            </div>
            <Button text="추가하기" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
