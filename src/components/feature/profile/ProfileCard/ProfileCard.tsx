import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/shared/ui/use-toast';
import { UserType } from '@/types/user/user-type';
import useModal from '@/store/use-modal-store';
import usePostFollow from '@/models/queries/user/follow/post-follow/usePostFollow';
import useCancelFollow from '@/models/queries/user/follow/cancel-follow/useCancelFollow';
import { Button } from '@/components/shared';
import Blur from '@/components/shared/Blur/Blur';

interface ProfileCardProps {
  user: UserType;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const { toast } = useToast();
  const { onOpen } = useModal();

  const queryClient = useQueryClient();
  const followMutation = usePostFollow();
  const unfollowMutation = useCancelFollow();

  const handleFollowButton = async () => {
    try {
      await followMutation.mutateAsync({
        userId: user?.id,
      });

      queryClient.invalidateQueries({ queryKey: ['followers'] });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: error.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: '알 수 없는 에러가 발생했습니다.',
        });
      }
    }
  };

  const handleUnfollowButton = async () => {
    try {
      await unfollowMutation.mutateAsync({
        userId: user?.id,
      });

      queryClient.invalidateQueries({ queryKey: ['followers'] });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '에러가 발생했습니다.',
      });
    }
  };

  return (
    <div className="flex animate-fadeIn flex-col items-center gap-[30px] rounded-[12px] border border-var-black3 bg-var-black2 px-[20px] py-[30px] text-[14px] text-var-white md:px-[30px] xl:gap-[40px] xl:px-[20px] xl:pt-[40px]">
      <div className="relative size-[120px]">
        {user?.image ? (
          <Image
            src={user?.image}
            alt="프로필 이미지"
            fill
            className="rounded-[50%] border border-var-gray1"
          />
        ) : (
          <Image
            src="/images/user-no-image.svg"
            alt="프로필 이미지"
            fill
            className="rounded-[50%] border border-var-gray1"
          />
        )}
      </div>
      <h1 className="text-[20px] font-semibold">{user?.nickname}</h1>
      <p className="text-var-gray1">{user?.description}</p>
      <div className="flex w-full">
        <div
          className="flex flex-1 cursor-pointer flex-col items-center border-r border-var-black3"
          onClick={() => onOpen('follow')}
        >
          <span className="text-[18px]">{user?.followersCount}</span>
          <span>팔로워</span>
        </div>
        <div
          className="flex flex-1 cursor-pointer flex-col items-center"
          onClick={() => onOpen('following')}
        >
          <span className="text-[18px]">{user?.followeesCount}</span>
          <span>팔로잉</span>
        </div>
      </div>
      {user?.isFollowing ? (
        <Button
          text="팔로우 취소"
          variant="tertiary"
          onClick={handleUnfollowButton}
        />
      ) : (
        <Button text="팔로우" onClick={handleFollowButton} />
      )}
      {user?.image && <Blur image={user?.image} />}
    </div>
  );
};

export default ProfileCard;
