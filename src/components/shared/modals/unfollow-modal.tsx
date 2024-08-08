import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

import useModal from '@/store/use-modal-store';
import useCancelFollow from '@/models/queries/user/follow/cancel-follow/useCancelFollow';
import Button from '../Button/Button';

const UnFollowModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { mutate: unfollowMutation } = useCancelFollow();
  const { userName, userId } = data;

  const isModalOpen = isOpen && type === 'unfollow';

  const handleUnFollow = () => {
    unfollowMutation({
      userId: Number(userId),
    });
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            {userName}님을 정말로 언팔로우 하시겠습니까? <br />
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-5 text-center">
            <div className="flex flex-col gap-[24px]">
              <Button
                text="언팔로우"
                variant="tertiary"
                onClick={handleUnFollow}
              />
              <Button text="취소" onClick={onClose} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UnFollowModal;
