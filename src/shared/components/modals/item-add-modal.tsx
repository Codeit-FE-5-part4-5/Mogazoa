<<<<<<< HEAD
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import axios from 'axios'; // axios import
=======
import { useState } from 'react';
>>>>>>> dev

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/shared/hooks/use-modal-store';
import DropDown from '../DropDown/DropDown';
<<<<<<< HEAD
import { apiInstance } from '@/shared/utils/axios'; // axios instance import
=======
import ImageInput from '../Input/ImageInput';
import TextAreaInput from '../Input/TextAreaInput';
import Button from '../Button/Button';
>>>>>>> dev

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export const ItemAddModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'itemAdd';
<<<<<<< HEAD
  const [text, setText] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState('/images/file.svg'); // 이미지 상태 추가
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
=======

  const [selecteItem, setSelecteItem] = useState('');
>>>>>>> dev

  const handleSave = async () => {
    const requestBody = {
      categoryId: selectedCategory,
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
<<<<<<< HEAD
      <DialogContent className="text-var-white mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] md:max-w-[500px]">
=======
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[620px]">
>>>>>>> dev
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
<<<<<<< HEAD
              <div className="w-full md:order-1">
                {/* Dropdown 컴포넌트 추가 */}
                <DropDown itemList={frameworks} onClick={setSelectedItem} />
                <DropDown itemList={frameworks} onClick={setSelectedCategory} />
              </div>
            </div>
            <div className="flex flex-col items-end rounded-md bg-[#252530]">
              <textarea
                className="text-var-white h-full w-full resize-none rounded-md bg-[#252530] p-5 outline-none"
                placeholder="상품을 추가해 주세요."
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
              추가하기
=======
              <div className="mt-[10px] w-full md:order-1 md:mt-0">
                <div className="flex flex-col gap-y-5">
                  <DropDown itemList={frameworks} onClick={setSelecteItem} />
                  <DropDown itemList={frameworks} onClick={setSelecteItem} />
                </div>
              </div>
            </div>
            <div className="flex h-[120px] flex-col items-end rounded-md bg-[#252530] md:h-[160px]">
              <TextAreaInput placeholder="리뷰를 작성해 주세요." />
>>>>>>> dev
            </div>
            <Button text="추가하기" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
