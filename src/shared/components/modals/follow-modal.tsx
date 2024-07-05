import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useModal } from '@/shared/hooks/use-modal-store';

const mockUsers = [
  {
    id: 1,
    name: 'first user',
    imgUrl: 'https://github.com/shadcn.png',
  },
  {
    id: 2,
    name: 'second user',
    imgUrl: 'https://github.com/shadcn.png',
  },
  {
    id: 3,
    name: 'third user',
    imgUrl: 'https://github.com/shadcn.png',
  },
];

export const FollowModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'follow';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="w-[500px] bg-[#1c1c22] text-var-white">
        <DialogHeader>
          <DialogTitle className="mb-10 text-2xl">
            유저를 팔로우하는 유저
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-6">
            {mockUsers.map((mockUser) => {
              return (
                <div className="flex items-center gap-x-5">
                  <Avatar>
                    <AvatarImage src={mockUser.imgUrl} />
                    <AvatarFallback>{mockUser.name}</AvatarFallback>
                  </Avatar>
                  <div className="text-lg text-var-white">{mockUser.name}</div>
                </div>
              );
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
