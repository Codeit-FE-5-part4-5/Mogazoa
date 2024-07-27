import useModal from '@/shared/store/use-modal-store';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

const Floating = () => {
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData(['me']);
  const { onOpen } = useModal();

  if (!me) {
    return null;
  }

  return (
    <div className="group fixed bottom-[10%] right-[10%] z-40">
      <button
        type="button"
        className="group-hover:animate-bg-gradient gradient-button flex size-[60px] items-center justify-center rounded-[50%] shadow-xl"
        onClick={() => onOpen('itemAdd')}
      >
        <Image src="/plus.svg" alt="플러스 버튼" width={40} height={40} />
      </button>
    </div>
  );
};

export default Floating;
