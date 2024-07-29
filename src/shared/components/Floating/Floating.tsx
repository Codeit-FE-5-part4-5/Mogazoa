import { cn } from '@/lib/utils';
import useModal from '@/shared/store/use-modal-store';
import { Me } from '@/shared/types/user/user';
import Image from 'next/image';

interface FloatingProps {
  me?: Me;
}

const Floating = ({ me }: FloatingProps) => {
  const { onOpen } = useModal();

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
          "flex size-[60px] items-center justify-center rounded-[50%] shadow-xl gradient-button hover:animate-bg-gradient", 
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
