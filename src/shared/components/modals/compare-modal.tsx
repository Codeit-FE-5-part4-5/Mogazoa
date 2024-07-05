import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/shared/hooks/use-modal-store';

export const CompareModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'compare';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            지금 보신 'Sony WH-1300XM3' <br /> 어떤 상품과 비교할까요?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="rounded-md border border-[#353542] py-6 text-lg hover:border-var-pink hover:text-var-pink">
              Air Pods 1
            </div>
            <div className="rounded-md border border-[#353542] py-6 text-lg hover:border-var-pink hover:text-var-pink">
              Air Pods Max
            </div>
            <div className="mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white">
              교체하기
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
