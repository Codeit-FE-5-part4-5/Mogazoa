import React, { ChangeEvent, useState, SetStateAction } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import CompareDropDownInput from '../DropDown/CompareDropDownInput';
import useGetProducts from '@/shared/models/product/useGetProducts';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/shared/hooks/use-modal-store';
import DropDown from '../DropDown/DropDown';
import apiInstance from '@/shared/utils/axios';
import ImageInput from '../Input/ImageInput';
import TextAreaInput from '../Input/TextAreaInput';
import Button from '../Button/Button';

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

export const ItemAddModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'itemAdd';
  const [text, setText] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState('');
  const { data: keywordList } = useGetProducts({ keyword: selectedItem });
  const [Bedge1, setBedge1] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };

  const handleSave = async () => {
    const requestBody = {
      categoryId: selectedCategory,
      image: image,
      description: text,
      name: selectedItem,
    };

    try {
      const response = await apiInstance.post('/products', requestBody);
      console.log('Response:', response.data);
      router.push('/mypage');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorDetails = error.response.data.details;
        if (errorDetails && errorDetails.name) {
          setErrorMessage(errorDetails.name.message);
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      } else {
        setErrorMessage('Unexpected Error');
      }
    }
  };

  const handleCategorySelect = (item: string) => {
    const index = frameworks.indexOf(item);
    if (index !== -1) {
      setSelectedCategory(index + 1);
      console.log(`Category '${item}' selected with index: ${index + 1}`);
    }
  };

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
                  <ImageInput
                    onChange={(image: string | null) => setImage(image || '')}
                  />
                </div>
              </div>
              <div className="w-full md:order-1">
                {/* Dropdown 컴포넌트 추가 */}
                <CompareDropDownInput
                  itemList={keywordList}
                  onClick={setSelectedItem}
                  Bedge={Bedge1}
                  setBedge={setBedge1}
                  value={selectedItem}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeEvent(e, setSelectedItem)
                  }
                />
                <DropDown
                  itemList={frameworks}
                  onClick={handleCategorySelect}
                />
              </div>
            </div>
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
            {errorMessage && (
              <div className="mb-5 text-red-500">{errorMessage}</div>
            )}
            <div
              className="mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white"
              onClick={handleSave}
            >
              추가하기
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
