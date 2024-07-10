import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useModal } from '@/shared/hooks/use-modal-store';
import { getCookie } from '@/shared/utils/cookie';
import useGetMe from '@/shared/models/auth/useGetMe';
import useGetUserFollowers from '@/shared/models/user/followers/useGetUserFollowers';
import { Follower } from '@/shared/types/follow/followers/followers-type';

export const FollowModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'follow';

  const token = getCookie('accessToken');

  const { data: user } = useGetMe(token);
  const { data: followers } = useGetUserFollowers(user?.data.id);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-5 self-start text-xl xl:mb-10 xl:text-2xl">
            유저를 팔로우하는 유저
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-6">
            {followers?.data.list.map((follower: Follower) => {
              return (
                <div className="flex items-center gap-x-5" key={follower?.id}>
                  <Avatar>
                    <AvatarImage
                      className="w-[48px] xl:w-[52px]"
                      src={follower?.image}
                    />
                    <AvatarFallback>{follower?.nickname}</AvatarFallback>
                  </Avatar>
                  <div className="text-base text-var-white xl:text-lg">
                    {follower?.nickname}
                  </div>
                </div>
              );
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
