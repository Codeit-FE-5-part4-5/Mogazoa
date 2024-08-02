import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

import React, { ChangeEvent, useState, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import apiInstance from '@/utils/axios';
import useModal from '@/store/use-modal-store';

import DropDown from '../DropDown/DropDown';
import ImageInput from '../Input/ImageInput';
import TextFieldInput from '../Input/TextFieldInput';
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

const ItemAddModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'itemAdd';
  const [text, setText] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState('');
  // const { data: keywordList } = useGetProducts({ keyword: selectedItem });
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // const {
  //   fetchNextPage: fetchNextPage1,
  //   hasNextPage: hasNextPage1,
  //   isFetchingNextPage: isFetchingNextPage1,
  //   isFetching: isFetching1,
  //   data: keywordList1,
  // } = useGetInfiniteProducts({ keyword: selectedItem });

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };

  const validateForm = () => {
    if (!selectedItem) {
      setErrorMessage('상품 이름은 필수 입력입니다.');
      return false;
    }
    if (!selectedCategory) {
      setErrorMessage('카테고리를 선택해주세요.');
      return false;
    }
    if (!image) {
      setErrorMessage('대표 이미지를 추가해주세요.');
      return false;
    }
    if (!text) {
      setErrorMessage('상품 설명은 필수 입력입니다.');
      return false;
    }
    if (text.length < 10) {
      setErrorMessage('최소 10자 이상 적어주세요.');
      return false;
    }
    setErrorMessage(null); // Clear any existing error messages
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const requestBody = {
      categoryId: selectedCategory,
      image,
      description: text,
      name: selectedItem,
    };

    try {
      const response = await apiInstance.post('/products', requestBody);
      onClose();
      // router.reload();
      router.push(`/detail/${response.data.id}`);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategorySelect = (item: string) => {
    const index = frameworks.indexOf(item);
    if (index !== -1) {
      setSelectedCategory(index + 1);
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
                  <ImageInput onChange={(image2) => setImage(image2 || '')} />
                </div>
              </div>
              <div className="w-full md:order-1">
                <TextFieldInput
                  placeholder="상품명을 입력하세요"
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
            {/* <button
              type="button"
              className={`mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white ${
                isSubmitting ? 'cursor-not-allowed opacity-80' : ''
              }`}
              onClick={handleSave}
              disabled={isSubmitting}
            >
              추가하기
            </button> */}
            <Button
              text="추가하기"
              onClick={handleSave}
              isPending={isSubmitting}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ItemAddModal;
