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
    <div className="fixed bottom-[10%] right-[10%] z-40">
      <button
        type="button"
        className="flex size-[60px] items-center justify-center rounded-[50%] shadow-xl gradient-button hover:animate-bg-gradient" // prettier-ignore
        onClick={() => onOpen('itemAdd')}
      >
        <Image src="/plus.svg" alt="플러스 버튼" width={40} height={40} />
      </button>
    </div>
  );
};

export default Floating;
