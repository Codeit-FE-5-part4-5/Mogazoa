import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/shared/hooks/use-modal-store';

export const ItemEditModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'itemEdit';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="w-[500px] bg-[#1c1c22] text-var-white">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">상품 편집</DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="mt-5 cursor-pointer rounded-md border border-[#353542] bg-gradient-to-r from-var-blue to-var-indigo py-6 text-lg text-var-white">
              저장하기
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
