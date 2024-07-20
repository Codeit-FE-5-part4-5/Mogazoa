import { useModal } from '@/shared/store/use-modal-store';
import Image from 'next/image';

const Floating = () => {
  const { onOpen } = useModal();
  const handleClick = () => {
    onOpen('itemAdd');
  };

  return (
    <div className="fixed bottom-[10%] right-[10%] z-40">
      <button
        className="flex size-[60px] items-center justify-center rounded-[50%] bg-gradient-custom shadow-xl"
        onClick={handleClick}
      >
        <Image src="/plus.svg" alt="플러스 버튼" width={40} height={40} />
      </button>
    </div>
  );
};

export default Floating;
