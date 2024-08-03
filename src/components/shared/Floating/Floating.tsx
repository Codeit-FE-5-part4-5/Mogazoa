import Image from 'next/image';
import { cn } from '@/lib/cn';
import useModal from '@/store/use-modal-store';
import useGetMe from '@/models/queries/auth/useGetMe';

const Floating = () => {
  const { onOpen } = useModal();
  const { data: me } = useGetMe();

  const handleClickFloating = () => {
    if (me) {
      onOpen('itemAdd');
    } else {
      onOpen('login');
    }
  };

  return (
    <div className="fixed bottom-[10%] right-[10%] z-40">
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
