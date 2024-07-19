import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/shared/store/use-modal-store';
import Button from '../Button/Button';
import { useRouter } from 'next/router';

export const CompareNoticeModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'compareNotice';
  const router = useRouter();

  const handleLoginPage = () => {
    router.push('/compare');
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            비교가 가능합니다 ! <br />
            비교페이지로 이동하시겠습니까 ?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <Button text="비교페이지 바로가기" onClick={handleLoginPage} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
