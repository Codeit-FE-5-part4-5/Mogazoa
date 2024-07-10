import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import axios from 'axios';
import Image from 'next/image';

import { useModal } from '@/shared/hooks/use-modal-store';
import DropDown from '../DropDown/DropDown';
import ImageInput from '../Input/ImageInput';
import TextAreaInput from '../Input/TextAreaInput';
import Button from '../Button/Button';
import apiInstance from '@/shared/utils/axios';
import { useState, ChangeEvent } from 'react';

const frameworks = [
  '음악',
  '영화/드라마',
  '강의/책',
  '호텔',
  '가구/인테리어',
  '식당',
  '전자기기',
  '화장품',
  '의류/잡화',
  '앱',
];

export const ItemEditModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'itemEdit';
  const [text, setText] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState('');
  const [image, setImage] = useState('/images/file.svg');
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
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
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
                className="h-full w-full resize-none rounded-md bg-[#252530] p-5 text-var-white outline-none"
                placeholder="상품을 수정해 주세요"
                value={text}
                maxLength={500}
                onChange={handleTextChange}
              />
              <div className="mb-5 mr-5">{text.length} / 500</div>
            </div>
            <div
              className="mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white"
              onClick={handleSave}
            >
              저장하기
            </div>
            <Button text="저장하기" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
