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
import { useRouter } from 'next/router';
import useGetUserFollowees from '@/shared/models/user/follow/followees/useGetUserFollowees';
import { FolloweeItem } from '@/shared/types/follow/followees/followees-type';

export const FollowingModal = () => {
  const router = useRouter();
  const path = router.pathname;

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'following';

  const token = getCookie('accessToken');
  const { data: user } = useGetMe(token);

  let userId: number | undefined;

  if (path === '/mypage' && user && user.data) {
    userId = user.data.id;
  } else if (router.query.userId) {
    userId = Number(router.query.userId);
  }

  const { data: followees } = useGetUserFollowees(userId);

  console.log(followees);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-5 self-start text-xl xl:mb-10 xl:text-2xl">
            유저가 팔로잉하는 유저
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-6">
            {followees?.data.list.map((followee: FolloweeItem) => {
              return (
                <div className="flex items-center gap-x-5" key={followee?.id}>
                  <Avatar>
                    <AvatarImage
                      className="w-[48px] xl:w-[52px]"
                      src={followee?.followee?.image}
                    />
                    <AvatarFallback>
                      {followee?.followee?.nickname}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-base text-var-white xl:text-lg">
                    {followee?.followee?.nickname}
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
