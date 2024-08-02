import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

import { useState } from 'react';
import useModal from '@/store/use-modal-store';

import useDeleteReview from '@/models/reviews/useDeleteReview';
import Button from '../Button/Button';

interface Props {
  productId: number;
  order: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
}

const ReviewDeleteModal = ({ order = 'recent', productId }: Props) => {
  const { isOpen, onClose, type, data } = useModal();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reviewId = data?.reviewId;
  const isModalOpen = isOpen && type === 'reviewDelete';

  const deleteReviewMutation = useDeleteReview({
    reviewId,
    productId,
    order,
  });

  const handleDeleteReview = async () => {
    try {
      await deleteReviewMutation.mutateAsync();
      onClose();
    } catch (error) {
      setErrorMessage('리뷰 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            정말 삭제하시겠습니까 ?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <Button text="삭제하기" onClick={handleDeleteReview} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDeleteModal;
