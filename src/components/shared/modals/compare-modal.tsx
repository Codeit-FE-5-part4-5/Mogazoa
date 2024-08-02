import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useEffect, useState } from 'react';
import useModal from '@/store/use-modal-store';
import { ProductDetail } from '@/types/product/productDetail';
import Button from '../Button/Button';

interface Props {
  ProductDetailData: ProductDetail;
}

const CompareModal = ({ ProductDetailData }: Props) => {
  const { isOpen, onOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'compare';

  const [firstDataName, setFirstDataName] = useState<string | null>(null);
  const [secondDataName, setSecondDataName] = useState<string | null>(null);
  const [isChoiceProduct1, setIsChoiceProduct1] = useState(false);
  const [isChoiceProduct2, setIsChoiceProduct2] = useState(false);

  useEffect(() => {
    const productIdData1 = localStorage.getItem('productIdData1');
    const productIdData2 = localStorage.getItem('productIdData2');

    if (productIdData1) {
      setFirstDataName(JSON.parse(productIdData1).name);
    }

    if (productIdData2) {
      setSecondDataName(JSON.parse(productIdData2).name);
    }

    setIsChoiceProduct1(false);
    setIsChoiceProduct2(false);
  }, [firstDataName, secondDataName]);

  const handleChoiceProduct1 = () => {
    setIsChoiceProduct1(true);
    setIsChoiceProduct2(false);
  };

  const handleChoiceProduct2 = () => {
    setIsChoiceProduct2(true);
    setIsChoiceProduct1(false);
  };

  const handleChangeButton = () => {
    if (isChoiceProduct1) {
      localStorage.setItem('productIdData1', JSON.stringify(ProductDetailData));
      onOpen('compareConfirm');
      setFirstDataName(ProductDetailData.name);
    } else if (isChoiceProduct2) {
      localStorage.setItem('productIdData2', JSON.stringify(ProductDetailData));
      setSecondDataName(ProductDetailData.name);
      onOpen('compareConfirm');
    } else {
      // eslint-disable-next-line no-alert
      alert('교체할 제품을 선택해주세요.');
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            지금 보신 {ProductDetailData?.name} <br /> 어떤 상품과 비교할까요?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div
              className={`rounded-md border border-[#353542] py-6 text-lg hover:border-var-pink hover:text-var-pink ${isChoiceProduct1 ? 'border-var-pink text-var-pink' : ''}`}
              onClick={handleChoiceProduct1}
            >
              {firstDataName}
            </div>
            <div
              className={`rounded-md border border-[#353542] py-6 text-lg hover:border-var-pink hover:text-var-pink ${isChoiceProduct2 ? 'border-var-pink text-var-pink' : ''}`}
              onClick={handleChoiceProduct2}
            >
              {secondDataName}
            </div>
            <Button text="교체하기" onClick={handleChangeButton} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
