import Image from 'next/image';
import { cn } from '@/lib/cn';
import useModal from '@/store/use-modal-store';
import useGetMe from '@/models/queries/auth/useGetMe';
import { useChangeRouter } from '@/hooks';

const Floating = () => {
  const { currentPath } = useChangeRouter();
  const { onOpen } = useModal();
  const { data: me } = useGetMe();

  if (currentPath.includes('/sign')) return null;

  const handleClickFloating = () => {
    if (me) {
      onOpen('itemAdd');
    } else {
      onOpen('login');
    }
  };

  return (
    <div className="fixed bottom-[8%] right-[4%] z-40">
      <button
        type="button"
        className={cn(
          "flex size-[60px] items-center justify-center shadow-lg rounded-[50%] gradient-button hover:animate-bg-gradient", 
          !me && 'disabled-gradient'
        )} // prettier-ignore
        onClick={handleClickFloating}
      >
        <Image src="/plus.svg" alt="플러스 버튼" width={40} height={40} />
      </button>
    </div>
  );
};

export default Floating;
