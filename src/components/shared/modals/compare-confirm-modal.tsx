import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

import { useRouter } from 'next/router';
import useModal from '@/store/use-modal-store';

import Button from '../Button/Button';

const CompareConfirmModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'compareConfirm';

  const handleRoutePage = () => {
    router.push('/compare');
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            비교 상품이 교체되었습니다. <br />
            바로 확인해 보시겠어요?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <Button text="바로가기" onClick={handleRoutePage} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CompareConfirmModal;
