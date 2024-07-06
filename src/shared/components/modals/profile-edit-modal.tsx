import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/shared/hooks/use-modal-store';
import { ModalDropdown } from './modal-dropdown/modal-dropdown';
import DropDown from '../DropDown/DropDown';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export const ProfileEditModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'profileEdit';

  const [text, setText] = useState<string>('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 self-start text-2xl">
            프로필 편집
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="flex flex-col md:flex-row md:items-start">
              {/* Image Input 컴포넌트 추가 */}
              <Image
                src="/images/file.svg"
                width={160}
                height={160}
                alt="file"
              />
            </div>
            <div className="w-full">
              {/* Dropdown 컴포넌트 추가 */}
              <DropDown
                itemList={frameworks}
                onClick={() => console.log('...')}
              />
            </div>
            <div className="flex flex-col items-end rounded-md bg-[#252530]">
              <textarea
                className="h-full w-full resize-none rounded-md bg-[#252530] p-5 text-var-white outline-none"
                placeholder="프로필을 변경해 주세요"
                value={text}
                maxLength={500}
                onChange={handleTextChange}
              />
              <div className="mb-5 mr-5">{text.length} / 500</div>
            </div>
            <div className="mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white">
              저장하기
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
