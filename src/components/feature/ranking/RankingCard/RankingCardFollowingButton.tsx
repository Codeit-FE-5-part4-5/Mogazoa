import { cn } from '@/lib/cn';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { TButtonText } from './RankingCard';

interface FollowingButtonProps {
  isFollowing: boolean;
  buttonText: TButtonText;
  setButtonText: Dispatch<SetStateAction<TButtonText>>;
  handleClickFollow: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FollowingButton = ({
  isFollowing,
  buttonText,
  setButtonText,
  handleClickFollow,
}: FollowingButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => handleClickFollow(e)}
      onMouseEnter={() => {
        if (isFollowing) {
          setButtonText('언팔로우');
        }
      }}
      onMouseLeave={() => {
        if (isFollowing) {
          setButtonText('팔로잉');
        }
      }}
      className={cn(
        'flex flex-shrink-0 rounded-[16px] border border-var-black3 px-[8px] py-[4px] text-[12px] transition-colors duration-300 active:bg-var-blue xl:ml-auto',
        buttonText === '내 프로필' && 'hidden',
        buttonText === '팔로잉' && 'bg-var-black3 text-var-gray1',
        buttonText === '팔로우' &&
          'border-var-gray1 hover:border-var-indigo hover:bg-var-indigo',
        buttonText === '언팔로우' &&
          'hover:border-var-red hover:bg-var-red/5 hover:text-var-red',
      )}
    >
      {buttonText}
    </button>
  );
};

export default FollowingButton;
