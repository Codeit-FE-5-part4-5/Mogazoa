import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import axios from 'axios'; // axios import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/shared/hooks/use-modal-store';
import DropDown from '../DropDown/DropDown';
import { apiInstance } from '@/shared/utils/axios'; // axios instance import

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export const ItemEditModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'itemEdit';
  const [text, setText] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState('');
  const [image, setImage] = useState('/images/file.svg'); // 이미지 상태 추가
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSave = async () => {
    const requestBody = {
      categoryId: selectedItem,
      image: image, // 실제 이미지 URL로 대체 필요
      description: text,
      name: selectedItem,
    };

    try {
      const response = await apiInstance.post('/your-endpoint', requestBody);
      console.log('Response:', response.data);
      // 성공적인 요청 후 추가 작업
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.message);
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-var-white mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 self-start text-2xl">
            상품 편집
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="md:order-2">
                {/* Image Input 컴포넌트 추가 */}
                <Image src={image} width={160} height={160} alt="file" />
              </div>
              <div className="w-full md:order-1">
                {/* Dropdown 컴포넌트 추가 */}
                <DropDown itemList={frameworks} onClick={setSelectedItem} />
                <DropDown itemList={frameworks} onClick={setSelectedItem} />
              </div>
            </div>
            <div className="flex flex-col items-end rounded-md bg-[#252530]">
              <textarea
                className="text-var-white h-full w-full resize-none rounded-md bg-[#252530] p-5 outline-none"
                placeholder="상품을 수정해 주세요"
                value={text}
                maxLength={500}
                onChange={handleTextChange}
              />
              <div className="mb-5 mr-5">{text.length} / 500</div>
            </div>
            <div
              className="from-var-blue to-var-indigo text-var-white mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r py-6 text-lg"
              onClick={handleSave}
            >
              저장하기
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
