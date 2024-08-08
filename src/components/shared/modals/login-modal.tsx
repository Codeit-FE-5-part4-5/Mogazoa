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

const LoginModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'login';
  const router = useRouter();

  const handleLoginPage = () => {
    router.push('/signin');
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            로그인이 필요한 작업입니다 ! <br />
            로그인 페이지로 이동하시겠습니까 ?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <Button text="로그인 하러가기" onClick={handleLoginPage} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
